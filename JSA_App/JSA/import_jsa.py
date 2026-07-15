import openpyxl, json, os, sys
from jsa_app import JSARecord, WorkStep, db, RISK_MATRIX, get_risk_level

SRC = r"E:\BAHAA\JSA\JSA.xlsx"

def cell_val(ws, row, col):
    v = ws.cell(row=row, column=col).value
    return str(v).strip() if v else ""

def import_data():
    wb = openpyxl.load_workbook(SRC, data_only=True)
    ws = wb["Job Hazard Analysis "]

    job_title = cell_val(ws, 5, 4) or cell_val(ws, 5, 2)
    workplace = cell_val(ws, 5, 10) or cell_val(ws, 5, 9)
    date = cell_val(ws, 7, 4) or cell_val(ws, 7, 2)
    analyst = cell_val(ws, 7, 10) or cell_val(ws, 7, 8)
    worker = cell_val(ws, 24, 10) or cell_val(ws, 24, 8)
    safety_officer = cell_val(ws, 24, 2)
    dept_manager = cell_val(ws, 24, 14) or cell_val(ws, 24, 12)
    general_manager = cell_val(ws, 24, 19) or cell_val(ws, 24, 17)
    general_notes = cell_val(ws, 18, 3) or ""

    freq_score_text = cell_val(ws, 9, 11) or "1"
    like_score_text = cell_val(ws, 11, 11) or "1"
    sev_score_text = cell_val(ws, 13, 11) or "1"

    try:
        freq_score = int(float(freq_score_text))
    except:
        freq_score = 1
    try:
        like_score = int(float(like_score_text))
    except:
        like_score = 1
    try:
        sev_score = int(float(sev_score_text))
    except:
        sev_score = 1

    freq_desc = cell_val(ws, 9, 5) or cell_val(ws, 9, 3)
    like_desc = cell_val(ws, 11, 5) or cell_val(ws, 11, 3)
    sev_desc = cell_val(ws, 13, 5) or cell_val(ws, 13, 3)

    risk_score_text = cell_val(ws, 15, 11) or cell_val(ws, 15, 10) or "0"
    try:
        risk_score = int(float(risk_score_text))
    except:
        risk_score = RISK_MATRIX.get((like_score, sev_score), 0)
    risk_level, _ = get_risk_level(risk_score)

    ppe_set = set()
    for row in [9, 11, 13, 15]:
        for col in [14, 15, 16, 17, 18, 19, 20]:
            v = cell_val(ws, row, col)
            if v and v not in ("0", "مهمات الوقاية", "مهمات الوقاية "):
                ppe_set.add(v)

    steps = []
    for row in [22, 23]:
        num_text = cell_val(ws, row, 2)
        step_text = cell_val(ws, row, 3)
        hazard = cell_val(ws, row, 8)
        control = cell_val(ws, row, 12)
        notes = cell_val(ws, row, 17)
        if step_text or hazard or control:
            try:
                n = int(float(num_text))
            except:
                n = row - 21
            steps.append(WorkStep(n, step_text, hazard, control, notes))

    # Map workplace to department
    dept_map = {
        "الشئون الادارية": "الشئون الإدارية",
        "مكتب": "الشئون الإدارية",
    }
    dept = "أخرى"
    for kw, d in dept_map.items():
        if kw in workplace:
            dept = d
            break

    record = JSARecord(
        job_title=job_title,
        workplace=workplace,
        department=dept,
        date=date,
        analyst=analyst,
        freq_desc=freq_desc,
        freq_score=freq_score,
        likelihood_desc=like_desc,
        likelihood_score=like_score,
        severity_desc=sev_desc,
        severity_score=sev_score,
        risk_score=risk_score,
        risk_level=risk_level,
        ppe_items=list(ppe_set),
        steps=steps,
        worker=worker,
        safety_officer=safety_officer,
        dept_manager=dept_manager,
        general_manager=general_manager,
        general_notes=general_notes,
    )

    return record

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding='utf-8')
    record = import_data()
    if record.job_title and record.job_title != "الوظيفة":
        existing = [r for r in db.records if r.job_title == record.job_title]
        if existing:
            record.id = existing[0].id
            db.update(record)
            print("Updated:", record.job_title)
        else:
            db.add(record)
            print("Added:", record.job_title)
    else:
        print("No data found")
        # Show what we got for debugging
        print(f"  job_title={record.job_title!r}")
        print(f"  workplace={record.workplace!r}")
        print(f"  steps={len(record.steps)}")
        print(f"  risk_score={record.risk_score}")
