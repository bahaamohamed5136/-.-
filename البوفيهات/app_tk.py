import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import json
import os
import csv
from datetime import datetime
from PIL import Image, ImageTk, ImageFont, ImageDraw
import arabic_reshaper
from bidi.algorithm import get_display

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')
LOGO_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'namaa_logo.png')

BUFFETS = [
    "بوفيه الاستراحة",
    "بوفيه الدور الأرضى المبنى الإدارى القديم",
    "بوفيه الدور الأول المبنى الإدارى القديم",
    "بوفيه الدور الثانى المبنى الإدارى القديم",
    "بوفيه الدور الثانى المبنى الإدارى الجديد",
]
ITEMS_GRAM = ["شاى", "قهوه", "سكر"]
ITEMS_UNIT = ["نعناع", "ينسون", "لبن", "مياه معدنية"]
ITEMS_ALL = ITEMS_GRAM + ITEMS_UNIT

TEA_GRAMS = 2
COFFEE_GRAMS = 10
SUGAR_GRAMS = 10

CHART_COLORS = ["#E74C3C", "#F39C12", "#2ECC71", "#1ABC9C", "#9B59B6", "#E91E63", "#3498DB", "#00BCD4"]
LOW_STOCK_GRAM = 500
LOW_STOCK_UNIT = 5


def load_data():
    if not os.path.exists(DATA_FILE):
        return {"opening": {}, "additions": [], "dispensing": [],
                "nextAddId": 1, "nextDispId": 1, "ratios": {"tea": 2, "coffee": 10, "sugar": 10},
                "users": {"admin": {"password": "admin", "role": "مدير"}}}
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    if "ratios" not in data:
        data["ratios"] = {"tea": 2, "coffee": 10, "sugar": 10}
    if "users" not in data:
        data["users"] = {"admin": {"password": "admin", "role": "مدير"}}
    else:
        # Convert old format {"user": "pwd"} to new {"user": {"password": "pwd", "role": "مستخدم"}}
        for k, v in list(data["users"].items()):
            if isinstance(v, str):
                role = "مدير" if k == "admin" else "مستخدم"
                data["users"][k] = {"password": v, "role": role}
    return data


def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


class RTLTable(tk.Frame):
    """RTL-aware table: headers[0]=rightmost column, headers[-1]=leftmost column."""

    def __init__(self, parent, headers, data, col_widths=None, row_height=32,
                 header_bg='#1B2A4A', header_fg='white', alt_color='#F5F9FF',
                 cell_style_fn=None):
        super().__init__(parent)
        self.headers = headers
        self.data = data
        self.header_bg = header_bg
        self.header_fg = header_fg
        self.alt_color = alt_color
        self.cell_style_fn = cell_style_fn or (lambda r, c, v: {})
        self.nc = len(headers)

        self.canvas = tk.Canvas(self, highlightthickness=0, bg='white')
        vsb = ttk.Scrollbar(self, orient='vertical', command=self.canvas.yview)
        self.inner = tk.Frame(self.canvas, bg='white')
        self.inner.bind('<Configure>', lambda e: self.canvas.configure(scrollregion=self.canvas.bbox('all')))
        self.canvas.create_window((0, 0), window=self.inner, anchor='nw')
        self.canvas.configure(yscrollcommand=vsb.set)
        self.canvas.pack(side='right', fill='both', expand=True)
        vsb.pack(side='left', fill='y')

        self._build(col_widths or [140] * self.nc)

    def _gcol(self, j):
        return self.nc - 1 - j

    def _mw(self, e):
        self.canvas.yview_scroll(int(-1 * e.delta / 120), 'units')

    def _build(self, widths):
        for j, h in enumerate(self.headers):
            gc = self._gcol(j)
            lbl = tk.Label(self.inner, text=h, bg=self.header_bg, fg=self.header_fg,
                           font=('Segoe UI', 10, 'bold'), padx=8, pady=6, anchor='center')
            lbl.grid(row=0, column=gc, sticky='ew', padx=0, pady=0)
            lbl.bind('<MouseWheel>', self._mw)
            self.inner.columnconfigure(gc, weight=0, minsize=widths[j] if j < len(widths) else 120)
        for i, row in enumerate(self.data):
            bg = 'white' if i % 2 == 0 else self.alt_color
            for j, val in enumerate(row):
                gc = self._gcol(j)
                st = self.cell_style_fn(i, j, val)
                lbl = tk.Label(self.inner, text=str(val),
                               bg=st.get('bg', bg), fg=st.get('fg', '#1B2A4A'),
                               font=st.get('font', ('Segoe UI', 10)),
                               padx=6, pady=4, anchor=st.get('anchor', 'center'))
                lbl.grid(row=i + 1, column=gc, sticky='ew', padx=0, pady=0)
                lbl.bind('<MouseWheel>', self._mw)


class BuffetApp:
    def __init__(self, root):
        self.root = root
        self.root.title("نظام إدارة مخزون البوفيهات")
        self.root.geometry("1350x780+50+20")
        self.root.minsize(1100, 700)
        self.data = load_data()
        self._ensure_defaults()
        self.disp_vars = {}
        self.current_user = None
        self.current_role = None
        self.root.after_idle(self._show_login)
        self.root.bind('<Configure>', self._on_resize)

    def _ensure_defaults(self):
        for b in BUFFETS:
            for i in ITEMS_ALL:
                k = b + "::" + i
                if k not in self.data["opening"]:
                    self.data["opening"][k] = 0
        save_data(self.data)

    def setup_ui(self):
        self._build_header()
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill='both', expand=True, padx=12, pady=6)

        tabs = [("home", "الرئيسية"), ("dashboard", "لوحة التحكم"), ("opening", "الرصيد الافتتاحى"),
                ("additions", "الإضافات"), ("dispensing", "الصرف"),
                ("summary", "ملخص المخزون"), ("analytics", "التحليلات")]
        self.tabs = {}
        for k, lbl in tabs:
            f = ttk.Frame(self.notebook)
            self.notebook.add(f, text=lbl)
            self.tabs[k] = f

        self._style_notebook()
        self.notebook.bind('<<NotebookTabChanged>>', self._on_tab_change)
        for name in ('home', 'dashboard', 'opening', 'additions', 'dispensing', 'summary', 'analytics'):
            getattr(self, f'build_{name}')()

        status = tk.Frame(self.root, bg='#1B2A4A', height=26)
        status.pack(fill='x')
        status.pack_propagate(False)
        tk.Label(status, text="معدلات الاستهلاك: شاى=2جم | قهوه=10جم | سكر=10جم/كوب | ينسون/نعناع/لبن/مياه=وحدة | by eng.bahaa",
                 fg='#C9A84C', bg='#1B2A4A', font=('Segoe UI', 9)).pack(pady=3)

    def _build_header(self):
        hdr = tk.Frame(self.root, bg='#1B2A4A', height=60)
        hdr.pack(fill='x')
        hdr.pack_propagate(False)

        # logo on the right
        lf = tk.Frame(hdr, bg='#1B2A4A', width=50, height=50)
        lf.pack(side='right', padx=(0, 15), pady=5)
        lf.pack_propagate(False)
        try:
            img = Image.open(LOGO_FILE).resize((45, 45), Image.LANCZOS)
            self.logo_img = ImageTk.PhotoImage(img)
            tk.Label(lf, image=self.logo_img, bg='#1B2A4A').place(relx=0.5, rely=0.5, anchor='center')
        except Exception:
            tk.Label(lf, text="نماء", fg='#C9A84C', bg='#1B2A4A',
                     font=('Segoe UI', 14, 'bold')).place(relx=0.5, rely=0.5, anchor='center')

        tk.Label(hdr, text="نظام إدارة مخزون البوفيهات", fg='#C9A84C', bg='#1B2A4A',
                 font=('Segoe UI', 20, 'bold')).pack(side='right', padx=10, pady=10)

        self.date_label = tk.Label(hdr, fg='#C9A84C', bg='#1B2A4A', font=('Segoe UI', 11))
        self.date_label.pack(side='left', padx=10, pady=10)
        self.date_label.config(text=datetime.now().strftime("%Y-%m-%d"))

        self.user_label = tk.Label(hdr, text="", fg='#C9A84C', bg='#1B2A4A',
                                   font=('Segoe UI', 11, 'bold'))
        self.user_label.pack(side='left', padx=5, pady=10)

        reset_btn = tk.Button(hdr, text="إعادة تعيين", bg='#C0392B', fg='white',
                              font=('Segoe UI', 9, 'bold'), cursor='hand2',
                              relief='flat', padx=10, pady=2, command=self._reset_prompt)
        reset_btn.pack(side='left', padx=10)
        reset_btn.bind('<Enter>', lambda e: reset_btn.config(bg='#a93226'))
        reset_btn.bind('<Leave>', lambda e: reset_btn.config(bg='#C0392B'))

    def _style_notebook(self):
        s = ttk.Style()
        s.theme_use('clam')
        s.configure('TNotebook', background='#E8EDF2')
        s.configure('TNotebook.Tab', padding=[18, 7], font=('Segoe UI', 10, 'bold'))
        s.map('TNotebook.Tab', background=[('selected', '#C9A84C'), ('!selected', '#2E5090')],
              foreground=[('selected', '#1B2A4A'), ('!selected', 'white')])
        s.configure('Treeview', rowheight=30, font=('Segoe UI', 10))
        s.configure('Treeview.Heading', font=('Segoe UI', 10, 'bold'), background='#1B2A4A', foreground='white')
        s.map('Treeview.Heading', background=[('active', '#2E5090')])

    # ───── helpers ─────
    def get_stock(self, buffet, item):
        k = buffet + "::" + item
        op = self.data["opening"].get(k, 0)
        ad = sum(a["qty"] for a in self.data["additions"] if a["buffet"] == buffet and a["item"] == item)
        cm = {"شاى": "teaGrams", "قهوه": "coffeeGrams", "سكر": "sugarGrams",
              "ينسون": "anise", "نعناع": "mint", "لبن": "milk", "مياه معدنية": "water"}
        col = cm.get(item)
        di = sum(d.get(col, 0) for d in self.data["dispensing"] if d["buffet"] == buffet) if col else 0
        return op + ad - di

    def total_added(self, buffet, item):
        return sum(a["qty"] for a in self.data["additions"] if a["buffet"] == buffet and a["item"] == item)

    def total_dispensed(self, buffet, item):
        cm = {"شاى": "teaGrams", "قهوه": "coffeeGrams", "سكر": "sugarGrams",
              "ينسون": "anise", "نعناع": "mint", "لبن": "milk", "مياه معدنية": "water"}
        col = cm.get(item)
        if not col: return 0
        return sum(d.get(col, 0) for d in self.data["dispensing"] if d["buffet"] == buffet)

    def analytics_by_buffet(self):
        return {b: {i: self.total_dispensed(b, i) for i in ITEMS_ALL} for b in BUFFETS}

    def fn(self, n):
        return f"{round(n):,}"

    def _ar(self, text):
        """Reshape Arabic text for PIL rendering."""
        try:
            return get_display(arabic_reshaper.reshape(str(text)))
        except Exception:
            return str(text)

    def _ar_font(self, size):
        """Load an Arabic-capable font."""
        candidates = [
            "C:/Windows/Fonts/arial.ttf",
            "C:/Windows/Fonts/tahoma.ttf",
            "C:/Windows/Fonts/segoeui.ttf",
            "C:/Windows/Fonts/times.ttf",
        ]
        for fp in candidates:
            try:
                return ImageFont.truetype(fp, size)
            except:
                continue
        return ImageFont.load_default()

    def _on_tab_change(self, event):
        idx = self.notebook.index(self.notebook.select())
        if idx == 0: return  # home tab
        [self.refresh_dashboard, self.refresh_opening, self.refresh_additions,
         self.refresh_dispensing, self.refresh_summary, self.refresh_analytics][idx - 1]()

    def _on_resize(self, event):
        if hasattr(self, 'chart_canvases'):
            for c in self.chart_canvases.values():
                if c.winfo_exists(): c.delete('all')

    def _btn(self, parent, text, color, cmd):
        btn = tk.Button(parent, text=text, bg=color, fg='white',
                        font=('Segoe UI', 10, 'bold'), cursor='hand2',
                        relief='flat', padx=18, pady=5, command=cmd)
        btn.bind('<Enter>', lambda e: btn.config(bg=self._dark(color)))
        btn.bind('<Leave>', lambda e: btn.config(bg=color))
        btn.pack(side='right', padx=4)
        return btn

    def _dark(self, c):
        c = c.lstrip('#')
        return f"#{max(0, int(c[0:2], 16) - 25):02x}{max(0, int(c[2:4], 16) - 25):02x}{max(0, int(c[4:6], 16) - 25):02x}"

    def _reset_prompt(self):
        if not self._check_admin(): return
        d = tk.Toplevel(self.root)
        d.title("إعادة تعيين البرنامج")
        d.geometry("350x180+500+300")
        d.configure(bg='white')
        d.resizable(False, False)
        tk.Label(d, text="أدخل الرقم السرى لإعادة تعيين البرنامج", font=('Segoe UI', 12, 'bold'),
                 fg='#1B2A4A', bg='white').pack(pady=20)
        pw = tk.Entry(d, width=20, font=('Segoe UI', 14), justify='center', show='*', relief='solid', bd=1)
        pw.pack(pady=10)
        err = tk.Label(d, text="", fg='red', bg='white', font=('Segoe UI', 10))
        err.pack()
        def check():
            if pw.get() == "51365136":
                if messagebox.askyesno("تأكيد", "هل أنت متأكد من إعادة تعيين جميع البيانات؟"):
                    self.data = {"opening": {}, "additions": [], "dispensing": [], "nextAddId": 1, "nextDispId": 1}
                    self._ensure_defaults()
                    save_data(self.data)
                    messagebox.showinfo("نجاح", "تم إعادة تعيين البرنامج بنجاح")
                    d.destroy()
                    self.notebook.select(0)
                    self.refresh_dashboard()
            else:
                err.config(text="❌ الرقم السرى خطأ")
        tk.Button(d, text="تأكيد", bg='#1E6B3C', fg='white', font=('Segoe UI', 10, 'bold'),
                  relief='flat', padx=20, pady=5, command=check).pack(pady=10)
        pw.bind('<Return>', lambda e: check())
        pw.focus()

    # ══════════════ HOME ══════════════
    def build_home(self):
        f = self.tabs["home"]
        # ttk.Frame doesn't support bg, use inner tk.Frame
        inner = tk.Frame(f, bg='#F0F4F8')
        inner.pack(fill='both', expand=True)

        # Center container
        con = tk.Frame(inner, bg='#F0F4F8')
        con.place(relx=0.5, rely=0.5, anchor='center')

        # Logo
        logo_frame = tk.Frame(con, bg='#F0F4F8', width=100, height=100)
        logo_frame.pack(pady=(0, 10))
        logo_frame.pack_propagate(False)
        try:
            img = Image.open(LOGO_FILE).resize((90, 90), Image.LANCZOS)
            self.home_logo = ImageTk.PhotoImage(img)
            tk.Label(logo_frame, image=self.home_logo, bg='#F0F4F8').place(relx=0.5, rely=0.5, anchor='center')
        except Exception:
            tk.Label(logo_frame, text="🌿", font=('Segoe UI', 48), bg='#F0F4F8').place(relx=0.5, rely=0.5, anchor='center')

        # Company name
        tk.Label(con, text="شركة نماء لصناعة الأعلاف", font=('Segoe UI', 22, 'bold'),
                 fg='#1B2A4A', bg='#F0F4F8').pack(pady=2)
        tk.Label(con, text="إدارة الشئون الإدارية", font=('Segoe UI', 14),
                 fg='#C9A84C', bg='#F0F4F8').pack(pady=2)

        # Separator
        tk.Frame(con, bg='#C9A84C', height=2).pack(fill='x', pady=12, padx=40)

        # Welcome
        tk.Label(con, text="أهلاً بكم في نظام إدارة البوفيهات", font=('Segoe UI', 16, 'bold'),
                 fg='#2E5090', bg='#F0F4F8').pack(pady=5)

        # Icon grid
        grid = tk.Frame(con, bg='#F0F4F8')
        grid.pack(pady=15)

        icons = [
            ("📊", "لوحة التحكم", 'dashboard'),
            ("📋", "الرصيد", 'opening'),
            ("➕", "إضافة", 'additions'),
            ("📤", "الصرف", 'dispensing'),
            ("📝", "الملخص", 'summary'),
            ("📈", "التحليلات", 'analytics'),
            ("⚙️", "الإعدادات", 'settings'),
        ]

        for i, (icon, label, tab_key) in enumerate(icons):
            r, c = divmod(i, 3)
            card = tk.Frame(grid, bg='white', relief='solid', bd=1, cursor='hand2')
            card.grid(row=r, column=c, padx=8, pady=8, ipadx=15, ipady=10)

            tk.Label(card, text=icon, font=('Segoe UI', 32), bg='white').pack(pady=(5, 2))
            tk.Label(card, text=label, font=('Segoe UI', 11, 'bold'), fg='#1B2A4A', bg='white').pack(pady=(2, 5))

            if tab_key == 'settings':
                def make_cmd(k):
                    return lambda e=None: self._settings_password_dialog()
            else:
                def make_cmd(k):
                    return lambda e=None: self._go_to_tab(k)

            def on_enter(e, c=card, kids=card.winfo_children()):
                c.configure(bg='#E8EDF2')
                for ch in kids:
                    try: ch.configure(bg='#E8EDF2')
                    except: pass
            def on_leave(e, c=card, kids=card.winfo_children()):
                c.configure(bg='white')
                for ch in kids:
                    try: ch.configure(bg='white')
                    except: pass

            card.bind('<Enter>', on_enter)
            card.bind('<Leave>', on_leave)
            cmd_fn = make_cmd(tab_key)
            card.bind('<Button-1>', cmd_fn)
            for child in card.winfo_children():
                child.bind('<Button-1>', cmd_fn)

    def _go_to_tab(self, key):
        keys = ['home', 'dashboard', 'opening', 'additions', 'dispensing', 'summary', 'analytics']
        idx = keys.index(key)
        self.notebook.select(idx)

    def _home_btn(self, parent):
        lbl = tk.Label(parent, text="🏠", font=('Segoe UI', 14), cursor='hand2')
        lbl.pack(side='left', padx=5)
        lbl.bind('<Button-1>', lambda e: self._go_to_tab('home'))
        lbl.bind('<Enter>', lambda e: lbl.config(fg='#C9A84C'))
        lbl.bind('<Leave>', lambda e: lbl.config(fg='black'))

    def _show_login(self):
        win = tk.Toplevel(self.root)
        win.title("تسجيل الدخول")
        ws = self.root.winfo_screenwidth()
        hs = self.root.winfo_screenheight()
        win.geometry("320x250+{}+{}".format(ws // 2 - 160, hs // 2 - 125))
        win.configure(bg='white')
        win.resizable(False, False)
        win.protocol('WM_DELETE_WINDOW', lambda: (win.destroy(), self.root.destroy()))

        main = tk.Frame(win, bg='white', padx=20, pady=15)
        main.pack(fill='both', expand=True)

        tk.Label(main, text="🔑 تسجيل الدخول", font=('Segoe UI', 16, 'bold'),
                 fg='#1B2A4A', bg='white').pack(pady=(5, 10))

        tk.Label(main, text="اسم المستخدم", bg='white', font=('Segoe UI', 10)).pack(anchor='e')
        user_var = tk.StringVar()
        user_entry = tk.Entry(main, textvariable=user_var, width=25, justify='center',
                 font=('Segoe UI', 11), relief='solid', bd=1)
        user_entry.pack(fill='x', pady=2)

        tk.Label(main, text="كلمة السر", bg='white', font=('Segoe UI', 10)).pack(anchor='e')
        pwd_var = tk.StringVar()
        pwd_entry = tk.Entry(main, textvariable=pwd_var, width=25, show='*', justify='center',
                 font=('Segoe UI', 11), relief='solid', bd=1)
        pwd_entry.pack(fill='x', pady=2)

        err = tk.Label(main, text="", fg='red', bg='white', font=('Segoe UI', 9))
        err.pack()

        def do_login(event=None):
            u = user_var.get().strip()
            p = pwd_var.get().strip()
            users = self.data.get("users", {})
            if u in users and isinstance(users[u], dict) and users[u].get("password") == p:
                self.current_user = u
                self.current_role = users[u].get("role", "مستخدم")
                self._update_user_display()
                win.destroy()
                self.setup_ui()
                self.root.deiconify()
            elif u in users and users[u] == p:  # backward compat
                self.current_user = u
                self.current_role = "مدير" if u == "admin" else "مستخدم"
                self._update_user_display()
                win.destroy()
                self.setup_ui()
                self.root.deiconify()
            else:
                err.config(text="❌ اسم المستخدم أو كلمة السر غير صحيحة")

        win.bind('<Return>', do_login)
        tk.Button(main, text="دخول", bg='#1B2A4A', fg='white',
                  font=('Segoe UI', 11, 'bold'), relief='flat',
                  padx=30, command=do_login).pack(pady=8)

        win.attributes('-topmost', True)
        win.grab_set()
        user_var.set("")
        pwd_var.set("")
        user_entry.focus()

    def _update_user_display(self):
        if hasattr(self, 'user_label') and self.user_label.winfo_exists():
            role = getattr(self, 'current_role', 'مستخدم')
            self.user_label.config(text=f"👤 {self.current_user} ({role})")

    def _check_admin(self):
        if getattr(self, 'current_role', None) != 'مدير':
            messagebox.showerror("صلاحيات", "❌ هذه الميزة متاحة للمدير فقط")
            return False
        return True

    def _settings_password_dialog(self):
        win = tk.Toplevel(self.root)
        win.title("تأكيد الدخول")
        ws = self.root.winfo_screenwidth()
        hs = self.root.winfo_screenheight()
        win.geometry("300x160+{}+{}".format(ws // 2 - 150, hs // 2 - 80))
        win.configure(bg='white')
        win.resizable(False, False)

        tk.Label(win, text="🔒 أدخل الرقم السرى", font=('Segoe UI', 13, 'bold'),
                 fg='#1B2A4A', bg='white').pack(pady=(15, 5))

        pwd_var = tk.StringVar()
        tk.Entry(win, textvariable=pwd_var, width=20, show='*',
                 font=('Segoe UI', 12), justify='center',
                 relief='solid', bd=1).pack(pady=5)

        def check():
            if pwd_var.get() == "51365136":
                win.destroy()
                self._settings_dialog()
            else:
                messagebox.showerror("خطأ", "الرقم السرى غير صحيح")

        tk.Button(win, text="دخول", bg='#1B2A4A', fg='white',
                  font=('Segoe UI', 10, 'bold'), relief='flat',
                  padx=20, command=check).pack(pady=8)

    def _settings_dialog(self):
        win = tk.Toplevel(self.root)
        win.title("الإعدادات")
        ws = self.root.winfo_screenwidth()
        hs = self.root.winfo_screenheight()
        win.geometry("600x500+{}+{}".format(ws // 2 - 300, hs // 2 - 250))
        win.configure(bg='white')

        nbook = ttk.Notebook(win)
        nbook.pack(fill='both', expand=True, padx=5, pady=5)

        # ═══ Tab 1: النسب ═══
        ratios_frame = tk.Frame(nbook, bg='white')
        nbook.add(ratios_frame, text="⚖️ النسب")

        tk.Label(ratios_frame, text="تعديل نسب الاستهلاك", font=('Segoe UI', 14, 'bold'),
                 fg='#1B2A4A', bg='white').pack(pady=(10, 5))

        ratios = self.data.get("ratios", {"tea": 2, "coffee": 10, "sugar": 10})
        rfields = {}
        for lbl, key, unit in [
            ("☕ كوب الشاى", "tea", "جم شاى/كوب"),
            ("☕ كوب القهوه", "coffee", "جم قهوه/كوب"),
            ("🍚 السكر للمشروبات", "sugar", "جم سكر/كوب"),
        ]:
            rf = tk.Frame(ratios_frame, bg='white')
            rf.pack(fill='x', pady=6, padx=40)
            e = tk.Entry(rf, width=8, justify='center', font=('Segoe UI', 11, 'bold'),
                         relief='solid', bd=1)
            e.insert(0, str(ratios.get(key, 0)))
            e.pack(side='right', padx=3)
            tk.Label(rf, text=unit, bg='white', fg='#555',
                     font=('Segoe UI', 9)).pack(side='right', padx=2)
            tk.Label(rf, text=lbl, bg='white', font=('Segoe UI', 10)).pack(side='right', padx=3)
            rfields[key] = e

        def save_ratios():
            try:
                t, c, s = float(rfields["tea"].get()), float(rfields["coffee"].get()), float(rfields["sugar"].get())
            except:
                messagebox.showerror("خطأ", "أدخل أرقاماً صحيحة")
                return
            if any(v <= 0 for v in (t, c, s)):
                messagebox.showerror("خطأ", "النسب يجب أن تكون أكبر من صفر")
                return
            self.data["ratios"] = {"tea": t, "coffee": c, "sugar": s}
            save_data(self.data)
            messagebox.showinfo("نجاح", "تم حفظ النسب بنجاح")

        tk.Button(ratios_frame, text="💾 حفظ النسب", bg='#1E6B3C', fg='white',
                  font=('Segoe UI', 10, 'bold'), relief='flat',
                  padx=20, command=save_ratios).pack(pady=10)

        # ═══ Tab 2: المستخدمين ═══
        users_frame = tk.Frame(nbook, bg='white')
        nbook.add(users_frame, text="👥 المستخدمين")

        # Users table
        th = tk.Frame(users_frame, bg='#1B2A4A')
        th.pack(fill='x', padx=5, pady=(5, 0))
        tk.Label(th, text="الإجراء", bg='#1B2A4A', fg='white',
                 font=('Segoe UI', 9, 'bold'), width=10).pack(side='left', padx=2, pady=4)
        tk.Label(th, text="نوع المستخدم", bg='#1B2A4A', fg='white',
                 font=('Segoe UI', 9, 'bold'), width=14).pack(side='left', padx=2, pady=4)
        tk.Label(th, text="كلمة السر", bg='#1B2A4A', fg='white',
                 font=('Segoe UI', 9, 'bold'), width=14).pack(side='left', padx=2, pady=4)
        tk.Label(th, text="اسم المستخدم", bg='#1B2A4A', fg='white',
                 font=('Segoe UI', 9, 'bold'), width=14).pack(side='left', padx=2, pady=4)

        ucon = tk.Frame(users_frame, bg='white')
        ucon.pack(fill='both', expand=True, pady=5, padx=5)
        canvas = tk.Canvas(ucon, highlightthickness=0, bg='white')
        vsb = ttk.Scrollbar(ucon, orient='vertical', command=canvas.yview)
        inner = tk.Frame(canvas, bg='white')
        inner.bind('<Configure>', lambda e: canvas.configure(scrollregion=canvas.bbox('all')))
        canvas.create_window((0, 0), window=inner, anchor='nw')
        canvas.configure(yscrollcommand=vsb.set)
        canvas.pack(side='right', fill='both', expand=True)
        vsb.pack(side='left', fill='y')

        def refresh_users():
            for w in inner.winfo_children(): w.destroy()
            for idx, (uname, info) in enumerate(self.data.get("users", {}).items()):
                bg = '#F5F9FF' if idx % 2 == 0 else 'white'
                rf = tk.Frame(inner, bg=bg)
                rf.pack(fill='x')
                pwd = info.get("password", "") if isinstance(info, dict) else info
                role = info.get("role", "مستخدم") if isinstance(info, dict) else ("مدير" if uname == "admin" else "مستخدم")
                is_admin = (role == "مدير")

                if is_admin:
                    tk.Label(rf, text="مدير", bg=bg, fg='#C9A84C',
                             font=('Segoe UI', 9, 'bold'), width=10).pack(side='left', padx=2, pady=2)
                else:
                    lbl_del = tk.Label(rf, text="🗑 حذف", bg=bg, fg='#C0392B',
                                       font=('Segoe UI', 9, 'bold'), cursor='hand2', width=10)
                    lbl_del.pack(side='left', padx=2, pady=2)
                    def mkdel(u):
                        def _del(e):
                            if messagebox.askyesno("تأكيد", f"حذف المستخدم {u}؟"):
                                del self.data["users"][u]
                                save_data(self.data)
                                refresh_users()
                        return _del
                    lbl_del.bind('<Button-1>', mkdel(uname))

                tk.Label(rf, text=role, bg=bg, fg='#1B2A4A',
                         font=('Segoe UI', 10, 'bold' if is_admin else 'normal'),
                         width=14).pack(side='left', padx=2, pady=2)
                tk.Label(rf, text="*" * len(pwd), bg=bg, fg='#555',
                         font=('Segoe UI', 10), width=14).pack(side='left', padx=2, pady=2)
                tk.Label(rf, text=uname, bg=bg, fg='#1B2A4A',
                         font=('Segoe UI', 10), width=14).pack(side='left', padx=2, pady=2)

        refresh_users()

        # Add user form
        af = tk.LabelFrame(users_frame, text="➕ إضافة مستخدم جديد", font=('Segoe UI', 9, 'bold'),
                           fg='#1B2A4A', padx=5, pady=5)
        af.pack(fill='x', padx=5, pady=5)

        afr = tk.Frame(af, bg='white')
        afr.pack()

        nu_var = tk.StringVar()
        np_var = tk.StringVar()
        nr_var = tk.StringVar(value="مستخدم")

        def add_user():
            u = nu_var.get().strip()
            p = np_var.get().strip()
            rl = nr_var.get()
            if not u or not p:
                messagebox.showerror("خطأ", "أدخل اسم المستخدم وكلمة السر")
                return
            if u in self.data.get("users", {}):
                messagebox.showerror("خطأ", "المستخدم موجود بالفعل")
                return
            self.data["users"][u] = {"password": p, "role": rl}
            save_data(self.data)
            nu_var.set("")
            np_var.set("")
            nr_var.set("مستخدم")
            refresh_users()

        tk.Button(afr, text="➕ إضافة", bg='#1E6B3C', fg='white',
                  font=('Segoe UI', 9, 'bold'), relief='flat',
                  padx=10, command=add_user).pack(side='right', padx=3)
        tf3 = tk.Frame(afr, bg='white')
        tf3.pack(side='right')
        tk.Label(tf3, text="الصلاحية", bg='white', font=('Segoe UI', 9)).pack(side='right')
        tk.Label(tf3, text=":", bg='white', font=('Segoe UI', 10)).pack(side='right', padx=1)
        ttk.Combobox(tf3, textvariable=nr_var, values=["مستخدم", "مدير"],
                     width=8, state='readonly', font=('Segoe UI', 9)).pack(side='right', padx=2)
        tf2 = tk.Frame(afr, bg='white')
        tf2.pack(side='right')
        tk.Label(tf2, text="كلمة السر", bg='white', font=('Segoe UI', 9)).pack(side='right')
        tk.Label(tf2, text=":", bg='white', font=('Segoe UI', 10)).pack(side='right', padx=1)
        tk.Entry(tf2, textvariable=np_var, width=14, show='*', justify='center',
                 font=('Segoe UI', 10), relief='solid', bd=1).pack(side='right', padx=2)
        tf1 = tk.Frame(afr, bg='white')
        tf1.pack(side='right')
        tk.Label(tf1, text="اسم المستخدم", bg='white', font=('Segoe UI', 9)).pack(side='right')
        tk.Label(tf1, text=":", bg='white', font=('Segoe UI', 10)).pack(side='right', padx=1)
        tk.Entry(tf1, textvariable=nu_var, width=14, justify='center',
                 font=('Segoe UI', 10), relief='solid', bd=1).pack(side='right', padx=2)

    # ══════════════ DASHBOARD ══════════════
    def build_dashboard(self):
        f = self.tabs["dashboard"]
        top = tk.Frame(f)
        top.pack(fill='x', padx=5, pady=2)
        tk.Label(top, text="📊 نظرة عامة على المخزون", font=('Segoe UI', 15, 'bold'),
                 fg='#1B2A4A').pack(side='right', padx=5)
        self._home_btn(top)

        hf = tk.Frame(f, bg='white', relief='solid', bd=1)
        hf.pack(fill='x', padx=10, pady=3, ipady=4)
        self.dash_hcards = {}
        for icon, label, key, bgc, fgc in [
            ("🏪", "إجمالى البوفيهات", 'buffets', '#E8F0FE', '#1B2A4A'),
            ("📦", "إجمالى الأصناف", 'items', '#FFF8E1', '#8D6E00'),
            ("⚠️", "مخزون منخفض", 'low', '#FFF3CD', '#E67E22'),
            ("🚫", "رصيد سالب", 'neg', '#FADBD8', '#C0392B'),
        ]:
            cf = tk.Frame(hf, bg=bgc, relief='solid', bd=1)
            cf.pack(side='right', padx=6, pady=3, ipadx=10, ipady=4)
            lbl = tk.Label(cf, bg=bgc, fg=fgc, font=('Segoe UI', 11, 'bold'))
            lbl.pack()
            self.dash_hcards[key] = lbl

        leg = tk.Frame(f)
        leg.pack(fill='x', pady=2, padx=10)
        tk.Label(leg, text="🔴", font=('Segoe UI', 9)).pack(side='right', padx=2)
        tk.Label(leg, text="رصيد سالب", fg='#C0392B', bg='#FADBD8',
                 font=('Segoe UI', 9, 'bold'), padx=8, pady=2).pack(side='right', padx=3)
        tk.Label(leg, text="🟠", font=('Segoe UI', 9)).pack(side='right', padx=2)
        tk.Label(leg, text="مخزون منخفض", fg='#E67E22', bg='#FFF3CD',
                 font=('Segoe UI', 9, 'bold'), padx=8, pady=2).pack(side='right', padx=3)
        tk.Label(leg, text="الجرامية < 500 جم | الوحدية < 5 وحدات",
                 fg='#555', font=('Segoe UI', 9)).pack(side='right', padx=8)

        self.dash_con = tk.Frame(f)
        self.dash_con.pack(fill='both', expand=True, padx=5)

    def _count_low_stock(self):
        total = 0
        for b in BUFFETS:
            for i in ITEMS_ALL:
                s = self.get_stock(b, i)
                thr = LOW_STOCK_GRAM if i in ITEMS_GRAM else LOW_STOCK_UNIT
                if 0 <= s < thr: total += 1
        return total

    def _count_negative_stock(self):
        total = 0
        for b in BUFFETS:
            for i in ITEMS_ALL:
                if self.get_stock(b, i) < 0: total += 1
        return total

    def refresh_dashboard(self):
        for w in self.dash_con.winfo_children(): w.destroy()
        self.dash_hcards['buffets'].config(text=f"🏪 إجمالى البوفيهات: {len(BUFFETS)}")
        self.dash_hcards['items'].config(text=f"📦 إجمالى الأصناف: {len(ITEMS_ALL)}")
        self.dash_hcards['low'].config(text=f"⚠️ مخزون منخفض: {self._count_low_stock()}")
        self.dash_hcards['neg'].config(text=f"🚫 رصيد سالب: {self._count_negative_stock()}")
        hdrs = ["البوفيه"] + ITEMS_ALL
        cw = [280] + [100] * len(ITEMS_ALL)

        def style(r, c, v):
            if c == 0: return {'anchor': 'e', 'font': ('Segoe UI', 10, 'bold')}
            item = hdrs[c]
            s = str(v).replace(',', '').lstrip('-')
            if s.isdigit():
                n = int(str(v).replace(',', ''))
                thr = LOW_STOCK_GRAM if item in ITEMS_GRAM else LOW_STOCK_UNIT
                if n < 0: return {'fg': '#C0392B', 'bg': '#FADBD8', 'font': ('Segoe UI', 10, 'bold')}
                if n < thr: return {'fg': '#E67E22', 'bg': '#FFF3CD', 'font': ('Segoe UI', 10, 'bold')}
            return {}

        rows = [[b[:30]] + [self.fn(self.get_stock(b, i)) for i in ITEMS_ALL] for b in BUFFETS]
        RTLTable(self.dash_con, hdrs, rows, col_widths=cw, cell_style_fn=style).pack(fill='both', expand=True)

    # ══════════════ OPENING ══════════════
    def build_opening(self):
        f = self.tabs["opening"]

        top = tk.Frame(f)
        top.pack(fill='x', padx=5, pady=(8, 2))
        tk.Label(top, text="📋 الرصيد الافتتاحى", font=('Segoe UI', 15, 'bold'),
                 fg='#1B2A4A').pack(side='right', padx=5)
        self._home_btn(top)

        info = tk.Frame(f, bg='#FFF8E1', relief='solid', bd=1)
        info.pack(fill='x', padx=10, pady=3, ipady=3)
        tk.Label(info, text="💡 الأصناف الجرامية (شاى · قهوه · سكر) بالكيلوجرام - الأصناف الوحدية (نعناع · ينسون · لبن · مياه) بالوحدة",
                 bg='#FFF8E1', fg='#8D6E00', font=('Segoe UI', 10)).pack(pady=2)

        self.opening_con = tk.Frame(f)
        self.opening_con.pack(fill='both', expand=True, pady=3)

        bf = tk.Frame(f)
        bf.pack(fill='x', pady=6)
        self._btn(bf, "💾 حفظ الرصيد الافتتاحى", '#1E6B3C', self.save_opening)

    def refresh_opening(self):
        for w in self.opening_con.winfo_children(): w.destroy()

        bb = [b.replace('بوفيه ', '')[:18] for b in BUFFETS]
        hdrs = ["الصنف"] + bb + ["الوحدة"]
        nc = len(hdrs)
        self.opening_entries = {}

        def gcol(j):
            return nc - 1 - j

        canvas = tk.Canvas(self.opening_con, highlightthickness=0, bg='white')
        vsb = ttk.Scrollbar(self.opening_con, orient='vertical', command=canvas.yview)
        inner = tk.Frame(canvas, bg='white')
        inner.bind('<Configure>', lambda e: canvas.configure(scrollregion=canvas.bbox('all')))
        canvas.create_window((0, 0), window=inner, anchor='nw')
        canvas.configure(yscrollcommand=vsb.set)
        canvas.pack(side='right', fill='both', expand=True)
        vsb.pack(side='left', fill='y')
        canvas.bind('<MouseWheel>', lambda e: canvas.yview_scroll(int(-1 * e.delta / 120), 'units'))

        # Header row
        for j, h in enumerate(hdrs):
            gc = gcol(j)
            tk.Label(inner, text=h, bg='#1B2A4A', fg='white',
                     font=('Segoe UI', 10, 'bold'), padx=6, pady=6, anchor='center'
                     ).grid(row=0, column=gc, sticky='ew')
            inner.columnconfigure(gc, weight=0, minsize=180 if h == "الصنف" else (80 if h == "الوحدة" else 145))

        def make_section(text, row):
            tk.Label(inner, text=text, bg='#C9A84C', fg='white',
                     font=('Segoe UI', 10, 'bold'), padx=8, pady=5, anchor='center'
                     ).grid(row=row, column=0, columnspan=nc, sticky='ew')

        def make_row(row, item, typ, unit, icon):
            gc0 = gcol(0)
            tf = tk.Frame(inner, bg='white')
            tf.grid(row=row, column=gc0, sticky='ew', padx=2, pady=2)
            tk.Label(tf, text=f"{icon} {item}", bg='white', fg='#1B2A4A',
                     font=('Segoe UI', 10, 'bold'), padx=4, anchor='e').pack(fill='x')
            for ci, b in enumerate(BUFFETS):
                gc = gcol(ci + 1)
                v = self.data["opening"].get(b + "::" + item, 0)
                e = tk.Entry(inner, width=14, justify='center',
                             font=('Segoe UI', 10), relief='solid', bd=1)
                e.insert(0, f"{v/1000:.3f}" if typ == 'gram' else str(int(v)))
                e.grid(row=row, column=gc, sticky='ew', padx=2, pady=2)
                self.opening_entries[(b, item)] = (e, typ)
            gc_last = gcol(nc - 1)
            tk.Label(inner, text=unit, bg='#E8F0FE', fg='#1B2A4A',
                     font=('Segoe UI', 10, 'bold'), anchor='center', padx=4, pady=2
                     ).grid(row=row, column=gc_last, sticky='ew', padx=2, pady=2)

        r = 1
        make_section("☕ الأصناف الجرامية (بالكيلوجرام)", r)
        r += 1
        for it in ITEMS_GRAM:
            make_row(r, it, 'gram', 'كجم', {'شاى': '☕', 'قهوه': '☕', 'سكر': '🍚'}.get(it, '📦'))
            r += 1
        make_section("📦 الأصناف الوحدية", r)
        r += 1
        for it in ITEMS_UNIT:
            make_row(r, it, 'unit', 'وحدة', {'نعناع': '🌿', 'ينسون': '🌿', 'لبن': '🥛', 'مياه معدنية': '💧'}.get(it, '📦'))
            r += 1

    def save_opening(self):
        for (b, item), (entry, typ) in self.opening_entries.items():
            try:
                v = float(entry.get())
            except ValueError:
                v = 0
            self.data["opening"][b + "::" + item] = int(v * 1000) if typ == 'gram' else int(v)
        save_data(self.data)
        messagebox.showinfo("نجاح", "تم حفظ الرصيد الافتتاحى بنجاح")

    # ══════════════ ADDITIONS ══════════════
    def build_additions(self):
        f = self.tabs["additions"]

        top = tk.Frame(f)
        top.pack(fill='x', padx=5, pady=(8, 2))
        tk.Label(top, text="➕ تسجيل الإضافات", font=('Segoe UI', 15, 'bold'),
                 fg='#1B2A4A').pack(side='right', padx=5)
        self._home_btn(top)

        form = tk.Frame(f, bg='white', relief='solid', bd=1)
        form.pack(fill='x', padx=10, pady=3, ipady=4)

        r1 = tk.Frame(form, bg='white')
        r1.pack(pady=4)
        self.add_buffet = ttk.Combobox(r1, values=BUFFETS, state='readonly',
                                       width=28, font=('Segoe UI', 10))
        self.add_buffet.current(0)
        self.add_buffet.pack(side='right', padx=3)
        tk.Label(r1, text="🏪", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)
        self.add_date = tk.Entry(r1, width=12, justify='center', font=('Segoe UI', 10),
                                 relief='solid', bd=1)
        self.add_date.insert(0, datetime.now().strftime("%Y-%m-%d"))
        self.add_date.pack(side='right', padx=3)
        tk.Label(r1, text="📅", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        tk.Frame(form, bg='#C9A84C', height=1).pack(fill='x', padx=20, pady=3)
        tk.Label(form, text="الصنف والكمية المضافة", bg='white', fg='#1B2A4A',
                 font=('Segoe UI', 11, 'bold')).pack(pady=1)

        grid = tk.Frame(form, bg='white')
        grid.pack(pady=3)

        self.add_item_vars = {}
        items_def = [
            ("tea",    "☕ شاى",    "كجم"),
            ("coffee", "☕ قهوه",   "كجم"),
            ("sugar",  "🍚 سكر",   "كجم"),
            ("anise",  "🌿 ينسون", "وحدة"),
            ("mint",   "🌿 نعناع", "وحدة"),
            ("water",  "💧 مياه",  "وحدة"),
            ("milk",   "🥛 لبن",   "وحدة"),
        ]
        for idx, (key, icon_label, unit) in enumerate(items_def):
            card = tk.Frame(grid, bg='#F5F9FF', relief='solid', bd=1)
            card.grid(row=0, column=idx, padx=3, ipadx=6, ipady=3)
            tk.Label(card, text=icon_label, bg='#F5F9FF', fg='#1B2A4A',
                     font=('Segoe UI', 10, 'bold')).pack()
            var = tk.StringVar(value="")
            self.add_item_vars[key] = var
            tk.Entry(card, textvariable=var, width=5, justify='center',
                     font=('Segoe UI', 11, 'bold'), relief='solid', bd=1).pack(pady=1)
            tk.Label(card, text=unit, bg='#F5F9FF', fg='#888',
                     font=('Segoe UI', 8)).pack()

        bot = tk.Frame(form, bg='white')
        bot.pack(pady=4)
        self._btn(bot, "إضافة للمخزون", '#1E6B3C', self.add_addition)
        self.add_notes = tk.Entry(bot, width=35, font=('Segoe UI', 10), relief='solid', bd=1)
        self.add_notes.pack(side='right', padx=4)
        tk.Label(bot, text="📝", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        sf = tk.Frame(f)
        sf.pack(fill='x', pady=2, padx=10)
        self.add_search_var = tk.StringVar()
        tk.Entry(sf, textvariable=self.add_search_var, width=28, font=('Segoe UI', 10),
                 relief='solid', bd=1, justify='center').pack(side='right', padx=3)
        tk.Label(sf, text="🔍", font=('Segoe UI', 12)).pack(side='right', padx=2)
        tk.Label(sf, text="بحث", width=8, anchor='e', font=('Segoe UI', 10)).pack(side='right', padx=3)
        self.add_search_var.trace_add('write', lambda *_: self.refresh_additions_table())

        tf = tk.LabelFrame(f, text="سجل الإضافات", font=('Segoe UI', 10, 'bold'),
                            fg='#1B2A4A', padx=5, pady=5)
        tf.pack(fill='both', expand=True, pady=5)
        self.add_tc = tk.Frame(tf)
        self.add_tc.pack(fill='both', expand=True)

    def _upd_add_unit(self):
        pass  # not needed anymore

    def add_addition(self):
        item_map = {"tea": "شاى", "coffee": "قهوه", "sugar": "سكر",
                    "anise": "ينسون", "mint": "نعناع", "water": "مياه معدنية", "milk": "لبن"}
        gram_keys = {"tea", "coffee", "sugar"}
        added = 0
        for key, item_name in item_map.items():
            raw = self.add_item_vars[key].get().strip()
            if not raw: continue
            try:
                q = float(raw)
            except:
                continue
            if q <= 0: continue
            self.data["additions"].append({
                "id": self.data["nextAddId"], "date": self.add_date.get(),
                "buffet": self.add_buffet.get(), "item": item_name,
                "qty": int(q * 1000) if key in gram_keys else int(q),
                "notes": self.add_notes.get()
            })
            self.data["nextAddId"] += 1
            added += 1
            self.add_item_vars[key].set("")
        if added == 0:
            messagebox.showwarning("تنبيه", "أدخل كمية صحيحة لصنف واحد على الأقل")
            return
        save_data(self.data)
        self.add_notes.delete(0, 'end')
        self.refresh_additions_table()
        messagebox.showinfo("نجاح", f"تم إضافة {added} أصناف للمخزون")

    def refresh_additions(self):
        self.add_date.delete(0, 'end')
        self.add_date.insert(0, datetime.now().strftime("%Y-%m-%d"))
        self.refresh_additions_table()

    def refresh_additions_table(self):
        query = self.add_search_var.get().strip().lower() if hasattr(self, 'add_search_var') else ''
        for w in self.add_tc.winfo_children(): w.destroy()
        hdrs = ["إجراء", "ملاحظات", "الكمية", "الصنف", "البوفيه", "التاريخ", "رقم"]
        tree = ttk.Treeview(self.add_tc, columns=list(range(len(hdrs))), show='headings', height=8)
        widths = [60, 150, 120, 120, 250, 100, 60]
        for idx, (h, wd) in enumerate(zip(hdrs, widths)):
            tree.heading(idx, text=h)
            tree.column(idx, width=wd, anchor='center')
        tree.pack(fill='both', expand=True, side='right')
        vsb = ttk.Scrollbar(self.add_tc, orient='vertical', command=tree.yview)
        vsb.pack(side='left', fill='y')
        tree.configure(yscrollcommand=vsb.set)
        hsb = ttk.Scrollbar(self.add_tc, orient='horizontal', command=tree.xview)
        hsb.pack(side='bottom', fill='x')
        tree.configure(xscrollcommand=hsb.set)
        for ri, a in enumerate(sorted(self.data["additions"], key=lambda x: -x["id"])):
            d = f"{a['qty']/1000:.3f} كجم" if a["item"] in ITEMS_GRAM else f"{a['qty']} وحدة"
            vals = ["🗑", a.get("notes", ""), d, a["item"], a["buffet"], a["date"], a["id"]]
            txt = ' '.join(str(v) for v in vals)
            if query and query not in txt.lower(): continue
            tree.insert('', 'end', values=vals, tags=('even' if ri % 2 == 0 else 'odd',))
        tree.tag_configure('even', background='#F5F9FF')
        tree.tag_configure('odd', background='white')
        tree.bind('<ButtonRelease-1>', lambda e: self._add_click(e, tree))
        tree.bind('<Double-1>', lambda e: self._add_dblclick(e, tree))

    def _add_click(self, event, tree):
        col = tree.identify_column(event.x)
        row_id = tree.identify_row(event.y)
        if not row_id or int(col[1:]) != 0: return
        vals = tree.item(row_id, 'values')
        if not vals: return
        if messagebox.askyesno("تأكيد", "حذف السجل المحدد؟"):
            self.data["additions"] = [a for a in self.data["additions"] if a["id"] != int(vals[-1])]
            save_data(self.data)
            self.refresh_additions_table()

    def _add_dblclick(self, event, tree):
        row_id = tree.identify_row(event.y)
        if not row_id: return
        vals = tree.item(row_id, 'values')
        if not vals or len(vals) < 7: return
        self._edit_addition_dialog(vals)

    def _edit_addition_dialog(self, vals):
        rec_id = int(vals[-1])
        orig = None
        for a in self.data["additions"]:
            if a["id"] == rec_id:
                orig = a
                break
        if not orig: return

        win = tk.Toplevel(self.root)
        win.title("تعديل سجل الإضافة")
        win.geometry("420x360+{}+{}".format(
            self.root.winfo_rootx() + 100, self.root.winfo_rooty() + 80))
        win.configure(bg='white')
        win.resizable(False, False)

        main = tk.Frame(win, bg='white', padx=15, pady=10)
        main.pack(fill='both', expand=True)

        tk.Label(main, text="تعديل سجل الإضافة", font=('Segoe UI', 14, 'bold'),
                 fg='#1B2A4A', bg='white').pack(pady=(0, 8))

        r_date = tk.Frame(main, bg='white')
        r_date.pack(fill='x', pady=3)
        e_date = tk.Entry(r_date, width=14, justify='center',
                          font=('Segoe UI', 10), relief='solid', bd=1)
        e_date.insert(0, orig["date"])
        e_date.pack(side='right', padx=3)
        tk.Label(r_date, text="📅", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        r_buf = tk.Frame(main, bg='white')
        r_buf.pack(fill='x', pady=3)
        e_buffet = ttk.Combobox(r_buf, values=BUFFETS, state='readonly',
                                width=28, font=('Segoe UI', 10))
        e_buffet.set(orig["buffet"])
        e_buffet.pack(side='right', padx=3)
        tk.Label(r_buf, text="🏪", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        r_item = tk.Frame(main, bg='white')
        r_item.pack(fill='x', pady=3)
        e_item = ttk.Combobox(r_item, values=ITEMS_ALL, state='readonly',
                              width=18, font=('Segoe UI', 10))
        e_item.set(orig["item"])
        e_item.pack(side='right', padx=3)
        tk.Label(r_item, text="📦", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        r_qty = tk.Frame(main, bg='white')
        r_qty.pack(fill='x', pady=3)
        qty_label = tk.Label(r_qty, text="كجم", bg='white', fg='#555',
                              font=('Segoe UI', 10))
        e_qty = tk.Entry(r_qty, width=12, justify='center', font=('Segoe UI', 10),
                         relief='solid', bd=1)
        # Convert stored qty to display value
        is_g = orig["item"] in ITEMS_GRAM
        display_qty = orig["qty"] / 1000 if is_g else orig["qty"]
        e_qty.insert(0, str(display_qty))
        e_qty.pack(side='right', padx=3)
        qty_label.pack(side='right', padx=2)

        def update_qty_label(*_):
            qty_label.config(text="كجم" if e_item.get() in ITEMS_GRAM else "وحدة")
        e_item.bind('<<ComboboxSelected>>', update_qty_label)
        update_qty_label()

        r_notes = tk.Frame(main, bg='white')
        r_notes.pack(fill='x', pady=3)
        e_notes = tk.Entry(r_notes, width=40, font=('Segoe UI', 10), relief='solid', bd=1)
        e_notes.insert(0, orig.get("notes", ""))
        e_notes.pack(side='right', padx=3)
        tk.Label(r_notes, text="📝", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        bf = tk.Frame(main, bg='white')
        bf.pack(pady=8)

        def save_edit():
            try:
                q = float(e_qty.get())
            except:
                messagebox.showerror("خطأ", "أدخل رقماً صحيحاً")
                return
            if q <= 0:
                messagebox.showwarning("تنبيه", "الكمية يجب أن تكون أكبر من صفر")
                return
            orig["date"] = e_date.get()
            orig["buffet"] = e_buffet.get()
            orig["item"] = e_item.get()
            is_g = orig["item"] in ITEMS_GRAM
            orig["qty"] = int(q * 1000) if is_g else int(q)
            orig["notes"] = e_notes.get()
            save_data(self.data)
            win.destroy()
            self.refresh_additions_table()
            messagebox.showinfo("نجاح", "تم تعديل السجل بنجاح")

        tk.Button(bf, text="💾 حفظ", bg='#1E6B3C', fg='white',
                  font=('Segoe UI', 10, 'bold'), relief='flat',
                  padx=20, command=save_edit).pack(side='right', padx=5)
        tk.Button(bf, text="❌ إلغاء", bg='#7F8C8D', fg='white',
                  font=('Segoe UI', 10, 'bold'), relief='flat',
                  padx=20, command=win.destroy).pack(side='right', padx=5)

    # ══════════════ DISPENSING ══════════════
    def build_dispensing(self):
        f = self.tabs["dispensing"]

        top = tk.Frame(f)
        top.pack(fill='x', padx=5, pady=(8, 2))
        tk.Label(top, text="📤 تسجيل الصرف", font=('Segoe UI', 15, 'bold'),
                 fg='#1B2A4A').pack(side='right', padx=5)
        self._home_btn(top)

        # ─── Form card ───
        form = tk.Frame(f, bg='white', relief='solid', bd=1)
        form.pack(fill='x', padx=10, pady=3, ipady=4)

        # Row 1: Date + Buffet (centered)
        r1 = tk.Frame(form, bg='white')
        r1.pack(pady=4)
        self.disp_buffet = ttk.Combobox(r1, values=BUFFETS, state='readonly',
                                        width=28, font=('Segoe UI', 10))
        self.disp_buffet.current(0)
        self.disp_buffet.pack(side='right', padx=3)
        tk.Label(r1, text="🏪", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)
        self.disp_date = tk.Entry(r1, width=12, justify='center', font=('Segoe UI', 10),
                                  relief='solid', bd=1)
        self.disp_date.insert(0, datetime.now().strftime("%Y-%m-%d"))
        self.disp_date.pack(side='right', padx=3)
        tk.Label(r1, text="📅", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        # Separator
        tk.Frame(form, bg='#C9A84C', height=1).pack(fill='x', padx=20, pady=3)
        tk.Label(form, text="الكوبايات والوحدات المصروفة", bg='white', fg='#1B2A4A',
                 font=('Segoe UI', 11, 'bold')).pack(pady=1)

        # Items: single row of 6 compact cards
        grid = tk.Frame(form, bg='white')
        grid.pack(pady=3)

        items = [
            ("tea",    "☕ شاى",    "(2 جم/كوب)", 0),
            ("coffee", "☕ قهوه",   "(10 جم/كوب)", 1),
            ("anise",  "🌿 ينسون", "", 2),
            ("mint",   "🌿 نعناع", "", 3),
            ("water",  "💧 مياه",  "", 4),
            ("milk",   "🥛 لبن",   "", 5),
        ]
        for key, icon_label, hint, col in items:
            card = tk.Frame(grid, bg='#F5F9FF', relief='solid', bd=1)
            card.grid(row=0, column=col, padx=3, ipadx=6, ipady=3)
            tk.Label(card, text=icon_label, bg='#F5F9FF', fg='#1B2A4A',
                     font=('Segoe UI', 10, 'bold')).pack()
            var = tk.StringVar(value="0")
            self.disp_vars[key] = var
            var.trace_add('write', lambda *_: self._upd_disp_calc())
            tk.Entry(card, textvariable=var, width=5, justify='center',
                     font=('Segoe UI', 11, 'bold'), relief='solid', bd=1).pack(pady=1)
            if hint:
                tk.Label(card, text=hint, bg='#F5F9FF', fg='#888',
                         font=('Segoe UI', 7)).pack()

        # ─── Calculation result ───
        self.disp_calc = tk.Label(form, text="", bg='#D4EDDA', fg='#1E6B3C',
                                   font=('Segoe UI', 9, 'bold'), pady=4)
        self.disp_calc.pack(fill='x', padx=10, pady=2)
        self._upd_disp_calc()

        # ─── Notes + Submit (same row) ───
        bot = tk.Frame(form, bg='white')
        bot.pack(pady=4)
        self._btn(bot, "تسجيل الصرف", '#C0392B', self.add_dispensing)
        self.disp_notes = tk.Entry(bot, width=35, font=('Segoe UI', 10), relief='solid', bd=1)
        self.disp_notes.pack(side='right', padx=4)
        tk.Label(bot, text="📝", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        # ─── Search ───
        sf = tk.Frame(f)
        sf.pack(fill='x', pady=2, padx=10)
        self.disp_search_var = tk.StringVar()
        tk.Entry(sf, textvariable=self.disp_search_var, width=28, font=('Segoe UI', 10),
                 relief='solid', bd=1, justify='center').pack(side='right', padx=3)
        tk.Label(sf, text="🔍", font=('Segoe UI', 12)).pack(side='right', padx=2)
        tk.Label(sf, text="بحث", width=8, anchor='e', font=('Segoe UI', 10)).pack(side='right', padx=3)
        self.disp_search_var.trace_add('write', lambda *_: self.refresh_dispensing_table())

        # ─── Dispensing record table ───
        tf = tk.LabelFrame(f, text="سجل الصرف", font=('Segoe UI', 10, 'bold'),
                            fg='#1B2A4A', padx=5, pady=5)
        tf.pack(fill='both', expand=True, pady=5)
        self.disp_tc = tk.Frame(tf)
        self.disp_tc.pack(fill='both', expand=True)

    def _upd_disp_calc(self):
        r = self.data.get("ratios", {"tea": 2, "coffee": 10, "sugar": 10})
        def gv(k):
            try: return int(self.disp_vars.get(k, tk.StringVar(value="0")).get())
            except: return 0
        t, c, a, m, w, lk = map(gv, ("tea", "coffee", "anise", "mint", "water", "milk"))
        self.disp_calc.config(text=f"الاستهلاك المحسوب: شاى={t*r['tea']}جم | قهوه={c*r['coffee']}جم | "
                                   f"سكر={(t+c+a+m)*r['sugar']}جم | ينسون={a}وحدة | نعناع={m}وحدة | "
                                   f"مياه={w}وحدة | لبن={lk}وحدة")

    def add_dispensing(self):
        def gv(k):
            try: return int(self.disp_vars[k].get())
            except: return 0
        t, c, a, m, w, lk = map(gv, ("tea", "coffee", "anise", "mint", "water", "milk"))
        if all(v == 0 for v in (t, c, a, m, w, lk)):
            messagebox.showwarning("تنبيه", "أدخل قيمة واحدة على الأقل")
            return
        r = self.data.get("ratios", {"tea": 2, "coffee": 10, "sugar": 10})
        self.data["dispensing"].append({
            "id": self.data["nextDispId"], "date": self.disp_date.get(),
            "buffet": self.disp_buffet.get(),
            "teaCups": t, "coffeeCups": c, "anise": a, "mint": m, "water": w, "milk": lk,
            "teaGrams": t * r['tea'], "coffeeGrams": c * r['coffee'],
            "sugarGrams": (t + c + a + m) * r['sugar'], "notes": self.disp_notes.get()
        })
        self.data["nextDispId"] += 1
        save_data(self.data)
        for k in ("tea", "coffee", "anise", "mint", "water", "milk"):
            self.disp_vars[k].set("0")
        self.disp_notes.delete(0, 'end')
        self._upd_disp_calc()
        self.refresh_dispensing_table()
        messagebox.showinfo("نجاح", "تم تسجيل الصرف بنجاح")

    def refresh_dispensing(self):
        self.disp_date.delete(0, 'end')
        self.disp_date.insert(0, datetime.now().strftime("%Y-%m-%d"))
        self.refresh_dispensing_table()

    def refresh_dispensing_table(self):
        query = self.disp_search_var.get().strip().lower() if hasattr(self, 'disp_search_var') else ''
        for w in self.disp_tc.winfo_children(): w.destroy()
        hdrs = ["إجراء", "سكر جم", "قهوه جم", "شاى جم", "لبن وحدة", "مياه وحدة",
                "نعناع وحدة", "ينسون وحدة", "قهوه كوب", "شاى كوب", "البوفيه", "التاريخ", "رقم"]
        widths = [50, 80, 80, 80, 80, 80, 80, 80, 80, 80, 250, 100, 50]
        tree = ttk.Treeview(self.disp_tc, columns=list(range(len(hdrs))), show='headings', height=8)
        for idx, (h, wd) in enumerate(zip(hdrs, widths)):
            tree.heading(idx, text=h)
            tree.column(idx, width=wd, anchor='center')
        tree.pack(fill='both', expand=True, side='right')
        vsb = ttk.Scrollbar(self.disp_tc, orient='vertical', command=tree.yview)
        vsb.pack(side='left', fill='y')
        tree.configure(yscrollcommand=vsb.set)
        hsb = ttk.Scrollbar(self.disp_tc, orient='horizontal', command=tree.xview)
        hsb.pack(side='bottom', fill='x')
        tree.configure(xscrollcommand=hsb.set)
        for ri, d in enumerate(sorted(self.data["dispensing"], key=lambda x: -x["id"])):
            vals = ["🗑", d["sugarGrams"], d["coffeeGrams"], d["teaGrams"],
                    d["milk"], d["water"], d["mint"], d["anise"],
                    d["coffeeCups"], d["teaCups"], d["buffet"], d["date"], d["id"]]
            txt = ' '.join(str(v) for v in vals)
            if query and query not in txt.lower(): continue
            tree.insert('', 'end', values=vals, tags=('even' if ri % 2 == 0 else 'odd',))
        tree.tag_configure('even', background='#F5F9FF')
        tree.tag_configure('odd', background='white')
        tree.bind('<ButtonRelease-1>', lambda e: self._disp_click(e, tree))
        tree.bind('<Double-1>', lambda e: self._disp_dblclick(e, tree))

    def _disp_click(self, event, tree):
        col = tree.identify_column(event.x)
        row_id = tree.identify_row(event.y)
        if not row_id or int(col[1:]) != 0: return
        vals = tree.item(row_id, 'values')
        if not vals: return
        if messagebox.askyesno("تأكيد", "حذف السجل المحدد؟"):
            self.data["dispensing"] = [d for d in self.data["dispensing"] if d["id"] != int(vals[-1])]
            save_data(self.data)
            self.refresh_dispensing_table()

    def _disp_dblclick(self, event, tree):
        row_id = tree.identify_row(event.y)
        if not row_id: return
        vals = tree.item(row_id, 'values')
        if not vals or len(vals) < 13: return
        self._edit_dispensing_dialog(vals)

    def _edit_dispensing_dialog(self, vals):
        """Popup dialog to edit a dispensing record."""
        rec_id = int(vals[-1])
        # Find the original record
        orig = None
        for d in self.data["dispensing"]:
            if d["id"] == rec_id:
                orig = d
                break
        if not orig: return

        win = tk.Toplevel(self.root)
        win.title("تعديل سجل الصرف")
        win.geometry("420x460+{}+{}".format(
            self.root.winfo_rootx() + 100, self.root.winfo_rooty() + 80))
        win.configure(bg='white')
        win.resizable(False, False)

        main = tk.Frame(win, bg='white', padx=15, pady=10)
        main.pack(fill='both', expand=True)

        tk.Label(main, text="تعديل سجل الصرف", font=('Segoe UI', 14, 'bold'),
                 fg='#1B2A4A', bg='white').pack(pady=(0, 8))

        fields = {}
        # Date
        r1 = tk.Frame(main, bg='white')
        r1.pack(fill='x', pady=3)
        e_date = tk.Entry(r1, width=14, justify='center', font=('Segoe UI', 10), relief='solid', bd=1)
        e_date.insert(0, orig["date"])
        e_date.pack(side='right', padx=3)
        tk.Label(r1, text="📅", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        # Buffet
        r2 = tk.Frame(main, bg='white')
        r2.pack(fill='x', pady=3)
        e_buffet = ttk.Combobox(r2, values=BUFFETS, state='readonly', width=28, font=('Segoe UI', 10))
        e_buffet.set(orig["buffet"])
        e_buffet.pack(side='right', padx=3)
        tk.Label(r2, text="🏪", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        # Items grid
        grid = tk.Frame(main, bg='white')
        grid.pack(pady=5)
        item_keys = [
            ("tea", "☕ شاى كوب", "teaCups"),
            ("coffee", "☕ قهوه كوب", "coffeeCups"),
            ("anise", "🌿 ينسون وحدة", "anise"),
            ("mint", "🌿 نعناع وحدة", "mint"),
            ("water", "💧 مياه وحدة", "water"),
            ("milk", "🥛 لبن وحدة", "milk"),
        ]
        entries = {}
        for idx, (k, lbl, dk) in enumerate(item_keys):
            r, c = divmod(idx, 3)
            cf = tk.Frame(grid, bg='#F5F9FF', relief='solid', bd=1)
            cf.grid(row=r, column=c, padx=4, pady=3, ipadx=4, ipady=2)
            tk.Label(cf, text=lbl, bg='#F5F9FF', fg='#1B2A4A',
                     font=('Segoe UI', 9, 'bold')).pack()
            e = tk.Entry(cf, width=5, justify='center',
                         font=('Segoe UI', 11, 'bold'), relief='solid', bd=1)
            e.insert(0, str(orig.get(dk, 0)))
            e.pack(pady=1)
            entries[k] = e

        # Notes
        rn = tk.Frame(main, bg='white')
        rn.pack(fill='x', pady=3)
        e_notes = tk.Entry(rn, width=40, font=('Segoe UI', 10), relief='solid', bd=1)
        e_notes.insert(0, orig.get("notes", ""))
        e_notes.pack(side='right', padx=3)
        tk.Label(rn, text="📝", bg='white', font=('Segoe UI', 12)).pack(side='right', padx=2)

        # Buttons
        bf = tk.Frame(main, bg='white')
        bf.pack(pady=8)

        def save_edit():
            try:
                t = int(entries["tea"].get() or 0)
                c = int(entries["coffee"].get() or 0)
                a = int(entries["anise"].get() or 0)
                m = int(entries["mint"].get() or 0)
                w = int(entries["water"].get() or 0)
                lk = int(entries["milk"].get() or 0)
            except:
                messagebox.showerror("خطأ", "أدخل أرقاماً صحيحة")
                return
            orig["date"] = e_date.get()
            orig["buffet"] = e_buffet.get()
            orig["teaCups"] = t
            orig["coffeeCups"] = c
            orig["anise"] = a
            orig["mint"] = m
            orig["water"] = w
            orig["milk"] = lk
            r = self.data.get("ratios", {"tea": 2, "coffee": 10, "sugar": 10})
            orig["teaGrams"] = t * r['tea']
            orig["coffeeGrams"] = c * r['coffee']
            orig["sugarGrams"] = (t + c + a + m) * r['sugar']
            orig["notes"] = e_notes.get()
            save_data(self.data)
            win.destroy()
            self.refresh_dispensing_table()
            messagebox.showinfo("نجاح", "تم تعديل السجل بنجاح")

        tk.Button(bf, text="💾 حفظ", bg='#1E6B3C', fg='white',
                  font=('Segoe UI', 10, 'bold'), relief='flat',
                  padx=20, command=save_edit).pack(side='right', padx=5)
        tk.Button(bf, text="❌ إلغاء", bg='#7F8C8D', fg='white',
                  font=('Segoe UI', 10, 'bold'), relief='flat',
                  padx=20, command=win.destroy).pack(side='right', padx=5)

    # ══════════════ SUMMARY ══════════════
    def build_summary(self):
        f = self.tabs["summary"]
        top = tk.Frame(f)
        top.pack(fill='x', pady=5)
        tk.Label(top, text="📝 الرصيد الافتتاحى + الإضافات - المنصرف = المتبقى",
                 font=('Segoe UI', 12, 'bold'), fg='#1B2A4A').pack(side='right', padx=5)
        self._home_btn(top)
        exp_f = tk.Frame(top)
        exp_f.pack(side='left', padx=5)
        self._btn(exp_f, "📸 صورة", '#2E5090', self.export_summary_image)
        self._btn(exp_f, "📄 PDF", '#1E6B3C', self.export_summary_pdf)
        self._btn(exp_f, "📊 Excel", '#1E6B3C', self.export_summary_excel)
        self.sum_con = tk.Frame(f)
        self.sum_con.pack(fill='both', expand=True)

    def refresh_summary(self):
        for w in self.sum_con.winfo_children(): w.destroy()
        bb = [b.replace('بوفيه ', '')[:20] for b in BUFFETS]
        hdrs = ["البيان"] + bb + ["الوحدة"]
        cw = [200] + [140] * len(bb) + [80]

        def style(r, c, v):
            s = str(v).replace(',', '').lstrip('-')
            if s.isdigit() and int(s) < 0:
                return {'fg': '#C0392B', 'bg': '#FADBD8', 'font': ('Segoe UI', 10, 'bold')}
            if c == 0:
                return {'anchor': 'e', 'font': ('Segoe UI', 10, 'bold')}
            if c == self.nc - 1:
                return {'anchor': 'center'}
            return {}

        self.nc = len(hdrs)
        rows = []
        for item in ITEMS_ALL:
            is_g = item in ITEMS_GRAM
            unit = "جم" if is_g else "وحدة"
            rows.append([f"── {item} ({unit}) ──"] + [''] * len(bb) + [''])
            for lbl, fn in [("الرصيد الافتتاحى", lambda b: self.data["opening"].get(b + "::" + item, 0)),
                             ("الإضافات", lambda b: self.total_added(b, item)),
                             ("المنصرف", lambda b: self.total_dispensed(b, item)),
                             ("المتبقى", lambda b: self.get_stock(b, item))]:
                vals = [self.fn(fn(b)) for b in BUFFETS]
                rows.append([lbl] + vals + [unit])
            rows.append([''] * (len(bb) + 2))
        RTLTable(self.sum_con, hdrs, rows, col_widths=cw, cell_style_fn=style).pack(fill='both', expand=True)

    # ══════════════ ANALYTICS ══════════════
    def build_analytics(self):
        f = self.tabs["analytics"]

        top = tk.Frame(f)
        top.pack(fill='x', pady=(5, 0))
        tk.Label(top, text="📈 التحليلات والإحصاءات", font=('Segoe UI', 15, 'bold'),
                 fg='#1B2A4A').pack(side='right', padx=5)
        self._home_btn(top)
        exp_f = tk.Frame(top)
        exp_f.pack(side='left', padx=5)
        self._btn(exp_f, "📸 صورة", '#2E5090', self.export_analytics_image)
        self._btn(exp_f, "📄 PDF", '#1E6B3C', self.export_analytics_pdf)
        self._btn(exp_f, "📥 CSV", '#1E6B3C', self.export_csv)

        flt = tk.Frame(f)
        flt.pack(fill='x', pady=3)

        self.filters = {}
        specs = [
            ("📅 من تاريخ:", "date_from", 10),
            ("📅 إلى تاريخ:", "date_to", 10),
        ]
        combo_specs = [
            ("🗓️ الشهر:", "month", 8, ["الكل"] + [f"{m:02d}" for m in range(1, 13)]),
            ("🏪 البوفيه:", "buffet", 14, ["الكل"] + BUFFETS),
            ("📦 الصنف:", "item", 10, ["الكل"] + ITEMS_ALL),
            ("📊 الترتيب:", "sort", 14, ["الافتراضي", "الأعلى استهلاكاً", "الأقل استهلاكاً"]),
        ]

        for lbl, key, w in specs:
            self.filters[key] = tk.StringVar()
            e = tk.Entry(flt, textvariable=self.filters[key], width=w,
                         font=('Segoe UI', 9), relief='solid', bd=1, justify='center')
            e.pack(side='right', padx=2)
            tk.Label(flt, text=lbl, font=('Segoe UI', 9)).pack(side='right', padx=1)

        for lbl, key, w, opts in combo_specs:
            self.filters[key] = tk.StringVar(value="الكل")
            cb = ttk.Combobox(flt, textvariable=self.filters[key], values=opts,
                              width=w, state='readonly', font=('Segoe UI', 9))
            cb.pack(side='right', padx=2)
            tk.Label(flt, text=lbl, font=('Segoe UI', 9)).pack(side='right', padx=1)

        tk.Button(flt, text="🔄 عرض", bg='#1B2A4A', fg='white',
                  font=('Segoe UI', 9, 'bold'), relief='flat', padx=12,
                  command=self.refresh_analytics).pack(side='right', padx=5)

        cf = tk.Frame(f)
        cf.pack(fill='both', expand=True)
        cf.grid_columnconfigure(0, weight=4)
        cf.grid_columnconfigure(1, weight=6)
        chart_frame = tk.Frame(cf)
        chart_frame.grid(row=0, column=0, sticky='nsew')
        table_frame = tk.Frame(cf)
        table_frame.grid(row=0, column=1, sticky='nsew')

        lf = tk.Frame(chart_frame)
        lf.pack(side='right', fill='both', expand=True)
        rf = tk.Frame(chart_frame)
        rf.pack(side='left', fill='both', expand=True)

        self.chart_canvases = {}
        self.chart_tip = None
        chart_defs = [
            ("bar_gram", "📊 استهلاك الشاى والقهوه والسكر", lf),
            ("hbar", "🏪 إجمالى الاستهلاك لكل بوفيه", lf),
            ("bar_unit", "📊 استهلاك الوحدات", rf),
            ("pie", "🥧 توزيع الاستهلاك الإجمالى", rf),
        ]
        for name, title, p in chart_defs:
            fr = tk.LabelFrame(p, text=title, font=('Segoe UI', 9, 'bold'),
                               fg='#1B2A4A', bg='white', padx=3, pady=3)
            fr.pack(fill='both', expand=True, padx=3, pady=3)
            cnv = tk.Canvas(fr, bg='white', highlightthickness=0)
            cnv.bind('<Motion>', self._chart_mouse_move)
            cnv.pack(fill='both', expand=True)
            self.chart_canvases[name] = cnv

        tf = tk.LabelFrame(table_frame, text="📋 جدول إجمالى الاستهلاك",
                           font=('Segoe UI', 10, 'bold'), fg='#1B2A4A', padx=5, pady=5)
        tf.pack(fill='both', expand=True)
        self.an_tc = tk.Frame(tf)
        self.an_tc.pack(fill='both', expand=True)

    def _filter_records(self):
        """Return dispensing records matching current filters."""
        records = self.data["dispensing"]
        df = self.filters["date_from"].get().strip()
        dt = self.filters["date_to"].get().strip()
        month = self.filters["month"].get()
        buffet = self.filters["buffet"].get()

        out = []
        for r in records:
            d = r.get("date", "")
            if df and d < df: continue
            if dt and d > dt: continue
            if month != "الكل":
                parts = d.split("-")
                if len(parts) >= 2 and parts[1] != month: continue
            if buffet != "الكل" and r.get("buffet", "") != buffet: continue
            out.append(r)
        return out

    def _filtered_analytics(self, records):
        result = {b: {i: 0 for i in ITEMS_ALL} for b in BUFFETS}
        cm = {"شاى": "teaGrams", "قهوه": "coffeeGrams", "سكر": "sugarGrams",
              "ينسون": "anise", "نعناع": "mint", "لبن": "milk", "مياه معدنية": "water"}
        for r in records:
            b = r.get("buffet", "")
            if b not in result: continue
            for item, col in cm.items():
                result[b][item] += r.get(col, 0)
        return result

    def _filter_analytics_table(self):
        pass  # removed; replaced by full refresh

    def refresh_analytics(self):
        records = self._filter_records()
        data = self._filtered_analytics(records)

        # Determine buffet order (sorted if needed)
        sort_val = self.filters.get("sort", tk.StringVar(value="الكل")).get()
        buffet_order = list(BUFFETS)
        if sort_val == "الأعلى استهلاكاً":
            buffet_order.sort(key=lambda b: -sum(data[b].values()))
        elif sort_val == "الأقل استهلاكاً":
            buffet_order.sort(key=lambda b: sum(data[b].values()))

        # Item filter for chart focus
        item_filter = self.filters.get("item", tk.StringVar(value="الكل")).get()

        self.draw_charts(data, buffet_order, item_filter)

        # Rebuild table
        for w in self.an_tc.winfo_children(): w.destroy()
        hdrs = ["الإجمالى"] + ITEMS_ALL[::-1] + ["البوفيه"]
        widths = [100] + [90] * len(ITEMS_ALL) + [200]
        self.an_tree = ttk.Treeview(self.an_tc, columns=list(range(len(hdrs))),
                                    show='headings', height=8)
        for idx, (h, wd) in enumerate(zip(hdrs, widths)):
            self.an_tree.heading(idx, text=h)
            self.an_tree.column(idx, width=wd, anchor='center')
        self.an_tree.pack(fill='both', expand=True, side='right')
        vsb = ttk.Scrollbar(self.an_tc, orient='vertical', command=self.an_tree.yview)
        vsb.pack(side='left', fill='y')
        self.an_tree.configure(yscrollcommand=vsb.set)
        hsb = ttk.Scrollbar(self.an_tc, orient='horizontal', command=self.an_tree.xview)
        hsb.pack(side='bottom', fill='x')
        self.an_tree.configure(xscrollcommand=hsb.set)

        for ri, b in enumerate(buffet_order):
            tot = sum(data[b][i] for i in ITEMS_ALL)
            vals = [self.fn(tot)] + [self.fn(data[b][i]) for i in reversed(ITEMS_ALL)] + [b[:25]]
            self.an_tree.insert('', 'end', values=vals,
                                tags=('even' if ri % 2 == 0 else 'odd',))
        self.an_tree.tag_configure('even', background='#F5F9FF')
        self.an_tree.tag_configure('odd', background='white')

    def _chart_mouse_move(self, event):
        cnv = event.widget
        items = cnv.find_withtag('current')
        if not items:
            self._hide_chart_tip()
            return
        tags = cnv.gettags(items[0])
        tip_data = None
        for t in tags:
            if t.startswith('tip:'):
                tip_data = t[4:]
                break
        if tip_data:
            self._show_chart_tip(cnv, event.x_root + 15, event.y_root + 10, tip_data)
        else:
            self._hide_chart_tip()

    def _show_chart_tip(self, cnv, x, y, text):
        if self.chart_tip:
            try: self.chart_tip.destroy()
            except: pass
        self.chart_tip = tk.Toplevel(cnv)
        self.chart_tip.overrideredirect(True)
        self.chart_tip.geometry(f"+{x}+{y}")
        tk.Label(self.chart_tip, text=text, bg='#1B2A4A', fg='white',
                 font=('Segoe UI', 9, 'bold'), padx=10, pady=5).pack()

    def _hide_chart_tip(self):
        if self.chart_tip:
            try: self.chart_tip.destroy()
            except: pass
            self.chart_tip = None

    def draw_charts(self, data, buffet_order=None, item_filter="الكل"):
        if buffet_order is None:
            buffet_order = list(BUFFETS)
        bnames = [b.replace('بوفيه ', '')[:15] for b in buffet_order]
        for c in self.chart_canvases.values():
            c.delete('all')
        # Always draw all charts; data is already filtered
        self._draw_bar(self.chart_canvases["bar_gram"],
                       {"شاى": [data[b]["شاى"] for b in buffet_order],
                        "قهوه": [data[b]["قهوه"] for b in buffet_order],
                        "سكر": [data[b]["سكر"] for b in buffet_order]},
                       bnames, CHART_COLORS[:3])
        self._draw_bar(self.chart_canvases["bar_unit"],
                       {"نعناع": [data[b]["نعناع"] for b in buffet_order],
                        "ينسون": [data[b]["ينسون"] for b in buffet_order],
                        "لبن": [data[b]["لبن"] for b in buffet_order],
                        "مياه": [data[b]["مياه معدنية"] for b in buffet_order]},
                       bnames, CHART_COLORS[2:6])
        totals = {i: sum(data[b][i] for b in buffet_order) for i in ITEMS_ALL}
        self._draw_pie(self.chart_canvases["pie"], totals, CHART_COLORS)
        bt = [sum(data[b][i] for i in ITEMS_ALL) for b in buffet_order]
        self._draw_hbar(self.chart_canvases["hbar"], bt, bnames, CHART_COLORS)

    def _analytics_screenshot(self):
        """Screenshot the analytics tab visible area."""
        f = self.tabs["analytics"]
        self.root.update()
        x = f.winfo_rootx()
        y = f.winfo_rooty()
        w = f.winfo_width()
        h = f.winfo_height()
        if w < 10 or h < 10:
            self.root.geometry("1350x780+50+20")
            self.root.update()
            x = f.winfo_rootx()
            y = f.winfo_rooty()
            w = f.winfo_width()
            h = f.winfo_height()
        from PIL import ImageGrab
        return ImageGrab.grab((x, y, x + w, y + h))

    def _full_analytics_image(self):
        """Capture analytics tab - uses screen capture for proper Arabic rendering."""
        return self._analytics_screenshot()

    def export_analytics_image(self):
        fn = filedialog.asksaveasfilename(defaultextension=".png",
                                          filetypes=[("PNG", "*.png"), ("All", "*.*")])
        if not fn: return
        try:
            self._full_analytics_image().save(fn)
            messagebox.showinfo("نجاح", "تم تصدير الصورة بنجاح")
        except Exception as e:
            messagebox.showerror("خطأ", f"فشل التصدير: {str(e)}")

    def export_analytics_pdf(self):
        fn = filedialog.asksaveasfilename(defaultextension=".pdf",
                                          filetypes=[("PDF", "*.pdf")])
        if not fn: return
        try:
            self._full_analytics_image().save(fn, "PDF", resolution=120.0)
            messagebox.showinfo("نجاح", "تم تصدير PDF بنجاح")
        except Exception as e:
            messagebox.showerror("خطأ", f"فشل التصدير: {str(e)}")

    def _full_summary_image(self):
        """Render full summary table as PIL Image (all rows, no scrolling needed)."""
        bb = [b.replace('بوفيه ', '')[:20] for b in BUFFETS]
        hdrs = ["البيان"] + bb + ["الوحدة"]
        cw = [220] + [148] * len(bb) + [80]

        row_data = []
        for item in ITEMS_ALL:
            is_g = item in ITEMS_GRAM
            unit = "جم" if is_g else "وحدة"
            row_data.append(('h', f"── {item} ({unit}) ──", [''] * len(bb), ''))
            for lbl, getter in [
                ("الرصيد الافتتاحى", lambda b, i=item: self.data["opening"].get(b + "::" + i, 0)),
                ("الإضافات", lambda b, i=item: self.total_added(b, i)),
                ("المنصرف", lambda b, i=item: self.total_dispensed(b, i)),
                ("المتبقى", lambda b, i=item: self.get_stock(b, i)),
            ]:
                vals = [self.fn(getter(b)) for b in BUFFETS]
                row_data.append(('d', lbl, vals, unit))
            row_data.append(('s', '', [], ''))

        tf = self._ar_font(17)
        hf = self._ar_font(13)
        cf = self._ar_font(11)

        title_h, header_h, row_h, pad = 44, 36, 28, 14
        ncols = len(hdrs)
        img_w = sum(cw) + pad * 2
        img_h = title_h + header_h + len(row_data) * row_h + pad * 2

        img = Image.new('RGB', (img_w, img_h), 'white')
        draw = ImageDraw.Draw(img)

        draw.text((img_w - pad, pad + 2), self._ar("ملخص المخزون - شركة نماء لصناعة الأعلاف"),
                  fill='#1B2A4A', font=tf, anchor='rt')

        def get_x(j):
            return img_w - pad - sum(cw[:j + 1])

        for j, h in enumerate(hdrs):
            xj = get_x(j)
            draw.rectangle([xj, title_h, xj + cw[j], title_h + header_h], fill='#1B2A4A')
            draw.text((xj + cw[j] // 2, title_h + header_h // 2),
                      self._ar(h), fill='white', font=hf, anchor='mm')

        for ri, (typ, label, vals, unit) in enumerate(row_data):
            ry = title_h + header_h + ri * row_h
            if typ == 's':
                continue
            bg = '#F0F4F8' if typ == 'h' else ('white' if ri % 2 == 0 else '#F9FAFB')
            for j in range(ncols):
                xj = get_x(j)
                draw.rectangle([xj, ry, xj + cw[j], ry + row_h], fill=bg, outline='#E0E0E0')
                if j == 0:
                    draw.text((xj + cw[j] - 6, ry + row_h // 2),
                              self._ar(label), fill='#1B2A4A',
                              font=hf if typ == 'h' else cf, anchor='rm')
                elif j == ncols - 1:
                    draw.text((xj + cw[j] // 2, ry + row_h // 2),
                              self._ar(unit), fill='#555', font=cf, anchor='mm')
                else:
                    txt = vals[j - 1] if j - 1 < len(vals) else ''
                    draw.text((xj + cw[j] // 2, ry + row_h // 2),
                              self._ar(txt), fill='#1B2A4A', font=cf, anchor='mm')

        return img

    def export_summary_image(self):
        fn = filedialog.asksaveasfilename(defaultextension=".png",
                                          filetypes=[("PNG", "*.png"), ("All", "*.*")])
        if not fn: return
        try:
            self._full_summary_image().save(fn)
            messagebox.showinfo("نجاح", "تم تصدير الصورة بنجاح")
        except Exception as e:
            messagebox.showerror("خطأ", f"فشل التصدير: {str(e)}")

    def export_summary_pdf(self):
        fn = filedialog.asksaveasfilename(defaultextension=".pdf",
                                          filetypes=[("PDF", "*.pdf")])
        if not fn: return
        try:
            self._full_summary_image().save(fn, "PDF", resolution=120.0)
            messagebox.showinfo("نجاح", "تم تصدير PDF بنجاح")
        except Exception as e:
            messagebox.showerror("خطأ", f"فشل التصدير: {str(e)}")

    def export_summary_excel(self):
        fn = filedialog.asksaveasfilename(defaultextension=".csv",
                                          filetypes=[("CSV (Excel)", "*.csv"), ("All", "*.*")])
        if not fn: return
        try:
            bb = [b.replace('بوفيه ', '') for b in BUFFETS]
            with open(fn, 'w', newline='', encoding='utf-8-sig') as f:
                w = csv.writer(f)
                w.writerow(["البيان"] + bb + ["الوحدة"])
                for item in ITEMS_ALL:
                    is_g = item in ITEMS_GRAM
                    unit = "جم" if is_g else "وحدة"
                    w.writerow([f"{item} ({unit})"] + [''] * len(bb) + [''])
                    for lbl, getter in [
                        ("الرصيد الافتتاحى", lambda b, i=item: self.data["opening"].get(b + "::" + i, 0)),
                        ("الإضافات", lambda b, i=item: self.total_added(b, i)),
                        ("المنصرف", lambda b, i=item: self.total_dispensed(b, i)),
                        ("المتبقى", lambda b, i=item: self.get_stock(b, i)),
                    ]:
                        w.writerow([lbl] + [getter(b) for b in BUFFETS] + [unit])
                    w.writerow([])
            messagebox.showinfo("نجاح", "تم تصدير Excel بنجاح")
        except Exception as e:
            messagebox.showerror("خطأ", f"فشل التصدير: {str(e)}")

    def _draw_bar(self, cnv, datasets, labels, colors):
        cnv.update()
        w, h = cnv.winfo_width() or 350, cnv.winfo_height() or 180
        if w < 50: return
        ml, mr, mt, mb = 45, 15, 25, 35
        cw, ch = w - ml - mr, h - mt - mb
        all_v = [v for s in datasets.values() for v in s]
        mx = max(all_v) if all_v else 1
        n = len(labels)
        ns = len(datasets)
        gw = cw / n if n else cw
        bw = gw / (ns + 1) * 0.7
        off = (gw - bw * ns) / 2
        cnv.create_line(ml, mt, ml, mt + ch, fill='#ccc', width=1)
        for i in range(5):
            y = mt + ch - ch * i / 4
            cnv.create_text(ml - 6, y, text=str(int(mx * i / 4)), anchor='e', font=('Segoe UI', 8), fill='#555')
            cnv.create_line(ml + 2, y, ml + cw, y, fill='#eee', width=1)
        cnv.create_line(ml, mt + ch, ml + cw, mt + ch, fill='#ccc', width=1)
        for gi in range(n):
            for si, (sn, sv) in enumerate(datasets.items()):
                x = ml + gi * gw + off + si * bw
                v = sv[gi] if gi < len(sv) else 0
                bh = (v / mx) * ch if mx else 0
                c = colors[si] if si < len(colors) else '#999'
                tip = f"{sn}: {round(v):,} | {labels[gi]}"
                cnv.create_rectangle(x, mt + ch - bh, x + bw, mt + ch,
                                     fill=c, outline='white', width=1,
                                     tags=('chart_bar', f'tip:{tip}'))
            cnv.create_text(ml + gi * gw + gw / 2, mt + ch + 12, text=labels[gi],
                            font=('Segoe UI', 7), fill='#333')
        lx, ly = ml + cw - 10, mt + 3
        for si, sn in enumerate(datasets.keys()):
            tot = sum(datasets[sn]) if datasets[sn] else 0
            tip2 = f"{sn}: {round(tot):,}"
            cnv.create_rectangle(lx - 70, ly, lx - 60, ly + 10,
                                 fill=colors[si] if si < len(colors) else '#999', outline='',
                                 tags=('chart_legend', f'tip:{tip2}'))
            cnv.create_text(lx - 56, ly + 5, text=sn, anchor='w', font=('Segoe UI', 7), fill='#333')
            ly += 15

    def _draw_pie(self, cnv, items, colors):
        cnv.update()
        w, h = cnv.winfo_width() or 280, cnv.winfo_height() or 180
        if w < 50: return
        items = {k: v for k, v in items.items() if v > 0}
        if not items:
            cnv.create_text(w // 2, h // 2, text="لا توجد بيانات", fill='#999')
            return
        total = sum(items.values())
        cx, cy = w // 2 - 30, h // 2
        r = min(w, h) // 2 - 25
        sa = 90
        ly = 10
        for idx, (item, val) in enumerate(items.items()):
            ext = -(val / total) * 360
            c = colors[idx % len(colors)]
            tip = f"{item}: {round(val):,} ({val/total*100:.1f}%)"
            cnv.create_arc(cx - r, cy - r, cx + r, cy + r, start=sa, extent=ext,
                           fill=c, outline='white', width=2,
                           tags=('chart_pie', f'tip:{tip}'))
            sa += ext
            cnv.create_rectangle(w - 80, ly, w - 68, ly + 12, fill=c, outline='')
            cnv.create_text(w - 64, ly + 6, text=f"{item} ({val/total*100:.1f}%)",
                            anchor='w', font=('Segoe UI', 8), fill='#333')
            ly += 17
        cnv.create_text(cx, cy, text=self.fn(total), font=('Segoe UI', 11, 'bold'), fill='#1B2A4A')

    def _draw_hbar(self, cnv, values, labels, colors):
        cnv.update()
        w, h = cnv.winfo_width() or 280, cnv.winfo_height() or 180
        if w < 50: return
        ml, mr, mt, mb = 110, 15, 15, 25
        cw, ch = w - ml - mr, h - mt - mb
        mx = max(values) if values else 1
        n = len(labels)
        bh = ch / (n * 2) if n else 20
        cnv.create_line(ml, mt + ch, ml + cw, mt + ch, fill='#ccc', width=1)
        for i in range(5):
            x = ml + cw * i / 4
            cnv.create_text(x, mt + ch + 10, text=str(int(mx * i / 4)), font=('Segoe UI', 8), fill='#555')
            cnv.create_line(x, mt, x, mt + ch, fill='#eee', width=1)
        for i, (lb, v) in enumerate(zip(labels, values)):
            y = mt + i * bh * 2 + bh / 2
            bw = (v / mx) * cw if mx else 0
            c = colors[i % len(colors)]
            tip = f"{lb}: {round(v):,}"
            cnv.create_rectangle(ml, y, ml + bw, y + bh, fill=c, outline='white', width=1,
                                 tags=('chart_hbar', f'tip:{tip}'))
            cnv.create_text(ml - 6, y + bh / 2, text=lb, anchor='e', font=('Segoe UI', 8), fill='#333')
            if bw > 35:
                cnv.create_text(ml + bw - 4, y + bh / 2, text=str(round(v)),
                                anchor='e', font=('Segoe UI', 8, 'bold'), fill='white')

    def export_csv(self):
        fn = filedialog.asksaveasfilename(defaultextension=".csv", filetypes=[("CSV files", "*.csv")])
        if not fn: return
        try:
            with open(fn, 'w', newline='', encoding='utf-8-sig') as f:
                w = csv.writer(f)
                w.writerow(["البيان"] + BUFFETS)
                for item in ITEMS_ALL:
                    w.writerow([item] + [self.total_dispensed(b, item) for b in BUFFETS])
            messagebox.showinfo("نجاح", "تم تصدير ملف CSV بنجاح")
        except Exception as e:
            messagebox.showerror("خطأ", f"فشل التصدير: {str(e)}")


def main():
    root = tk.Tk()
    root.withdraw()
    BuffetApp(root)
    root.mainloop()


if __name__ == '__main__':
    main()
