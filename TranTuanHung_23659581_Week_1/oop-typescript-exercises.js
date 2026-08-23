var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* =============================================================
 * BÀI 1: Class Person - name, age - method display()
 * =============================================================
 */
var Person = /** @class */ (function () {
    // Constructor: hàm khởi tạo, chạy khi dùng "new Person(...)"
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    // Method hiển thị thông tin
    Person.prototype.display = function () {
        console.log("[Person] T\u00EAn: ".concat(this.name, ", Tu\u1ED5i: ").concat(this.age));
    };
    return Person;
}());
/* =============================================================
 * BÀI 2: Class Student extends Person - thêm grade
 * =============================================================
 */
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, grade) {
        // super(...) gọi constructor của lớp cha (Person)
        var _this = _super.call(this, name, age) || this;
        _this.grade = grade;
        return _this;
    }
    // Ghi đè / bổ sung method để hiển thị đầy đủ thông tin
    Student.prototype.displayInfo = function () {
        // Có thể tái sử dụng lại logic của cha bằng super.display()
        _super.prototype.display.call(this);
        console.log("[Student] L\u1EDBp: ".concat(this.grade));
    };
    return Student;
}(Person));
/* =============================================================
 * BÀI 3: Class Car - brand, model, year - method showInfo()
 * =============================================================
 */
var Car3 = /** @class */ (function () {
    function Car3(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    Car3.prototype.showInfo = function () {
        console.log("[Car] ".concat(this.brand, " ").concat(this.model, " (").concat(this.year, ")"));
    };
    return Car3;
}());
/* =============================================================
 * BÀI 4: Class Rectangle - width, height - area(), perimeter()
 * =============================================================
 */
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    // Diện tích = dài x rộng
    Rectangle.prototype.area = function () {
        return this.width * this.height;
    };
    // Chu vi = 2 x (dài + rộng)
    Rectangle.prototype.perimeter = function () {
        return 2 * (this.width + this.height);
    };
    return Rectangle;
}());
/* =============================================================
 * BÀI 5: Class BankAccount - balance - deposit(), withdraw()
 * =============================================================
 */
var BankAccount = /** @class */ (function () {
    function BankAccount(initialBalance) {
        if (initialBalance === void 0) { initialBalance = 0; }
        this.balance = initialBalance;
    }
    // Nạp tiền
    BankAccount.prototype.deposit = function (amount) {
        if (amount <= 0) {
            console.log("Số tiền nạp phải > 0");
            return;
        }
        this.balance += amount;
        console.log("\u0110\u00E3 n\u1EA1p ".concat(amount, ". S\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i: ").concat(this.balance));
    };
    // Rút tiền - kiểm tra đủ số dư mới cho rút
    BankAccount.prototype.withdraw = function (amount) {
        if (amount <= 0) {
            console.log("Số tiền rút phải > 0");
            return;
        }
        if (amount > this.balance) {
            console.log("Số dư không đủ để rút!");
            return;
        }
        this.balance -= amount;
        console.log("\u0110\u00E3 r\u00FAt ".concat(amount, ". S\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i: ").concat(this.balance));
    };
    BankAccount.prototype.getBalance = function () {
        return this.balance;
    };
    return BankAccount;
}());
/* =============================================================
 * BÀI 6: Class Book - title, author, year
 * =============================================================
 */
var Book = /** @class */ (function () {
    function Book(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    Book.prototype.display = function () {
        console.log("[Book] \"".concat(this.title, "\" - ").concat(this.author, " (").concat(this.year, ")"));
    };
    return Book;
}());
/* =============================================================
 * BÀI 7: Class User - private name + getter/setter
 * =============================================================
 */
var User = /** @class */ (function () {
    function User(name) {
        this._name = name;
    }
    Object.defineProperty(User.prototype, "name", {
        // Getter: cho phép đọc giá trị thông qua "user.name" (không cần dấu ())
        get: function () {
            return this._name;
        },
        // Setter: cho phép gán giá trị thông qua "user.name = ..."
        // Ở đây có thể thêm điều kiện kiểm tra hợp lệ trước khi gán
        set: function (value) {
            if (value.trim().length === 0) {
                console.log("Tên không được để trống!");
                return;
            }
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
/* =============================================================
 * BÀI 8: Class Product - name, price
 * Tạo mảng Product và lọc sản phẩm có price > 100
 * =============================================================
 */
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    return Product;
}());
function demoProductFilter() {
    var products = [
        new Product("Chuột", 50),
        new Product("Bàn phím", 150),
        new Product("Màn hình", 3200000 > 100 ? 3200000 : 0), // ví dụ giá lớn
        new Product("Tai nghe", 90),
    ];
    // filter(): duyệt qua mảng, giữ lại phần tử thoả điều kiện
    var expensiveProducts = products.filter(function (p) { return p.price > 100; });
    return expensiveProducts;
}
// Ví dụ 1 class implement interface trên
var Dog9 = /** @class */ (function () {
    function Dog9(name) {
        this.name = name;
    }
    Dog9.prototype.sound = function () {
        return "Gâu gâu!";
    };
    return Dog9;
}());
/* =============================================================
 * BÀI 10: Class Account - public, private, readonly
 * =============================================================
 */
var Account10 = /** @class */ (function () {
    function Account10(username, password, accountId) {
        this.username = username;
        this.password = password;
        this.accountId = accountId;
    }
    // Vì password là private, muốn kiểm tra phải qua method công khai
    Account10.prototype.checkPassword = function (input) {
        return input === this.password;
    };
    return Account10;
}());
/* =============================================================
 * BÀI 11: base class Animal, extend Dog (bark), Cat (meow)
 * =============================================================
 */
var Animal11 = /** @class */ (function () {
    function Animal11(name) {
        this.name = name;
    }
    return Animal11;
}());
var Dog11 = /** @class */ (function (_super) {
    __extends(Dog11, _super);
    function Dog11() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog11.prototype.bark = function () {
        console.log("".concat(this.name, " s\u1EE7a: G\u00E2u g\u00E2u!"));
    };
    return Dog11;
}(Animal11));
var Cat11 = /** @class */ (function (_super) {
    __extends(Cat11, _super);
    function Cat11() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat11.prototype.meow = function () {
        console.log("".concat(this.name, " k\u00EAu: Meo meo!"));
    };
    return Cat11;
}(Animal11));
var Bird12 = /** @class */ (function () {
    function Bird12() {
    }
    Bird12.prototype.fly = function () {
        console.log("Chim đang bay");
    };
    return Bird12;
}());
var Fish12 = /** @class */ (function () {
    function Fish12() {
    }
    Fish12.prototype.swim = function () {
        console.log("Cá đang bơi");
    };
    return Fish12;
}());
// Một class có thể implement NHIỀU interface cùng lúc (đa hình interface)
var Duck12 = /** @class */ (function () {
    function Duck12() {
    }
    Duck12.prototype.fly = function () {
        console.log("Vịt đang bay");
    };
    Duck12.prototype.swim = function () {
        console.log("Vịt đang bơi");
    };
    return Duck12;
}());
/* =============================================================
 * BÀI 13: abstract class Shape - area() - Square, Circle
 * abstract class: không thể new trực tiếp, chỉ dùng để kế thừa
 * =============================================================
 */
var Shape13 = /** @class */ (function () {
    function Shape13() {
    }
    // Method thường: lớp con dùng chung, không cần viết lại
    Shape13.prototype.describe = function () {
        console.log("Di\u1EC7n t\u00EDch: ".concat(this.area().toFixed(2)));
    };
    return Shape13;
}());
var Square13 = /** @class */ (function (_super) {
    __extends(Square13, _super);
    function Square13(side) {
        var _this = _super.call(this) || this;
        _this.side = side;
        return _this;
    }
    Square13.prototype.area = function () {
        return this.side * this.side;
    };
    return Square13;
}(Shape13));
var Circle13 = /** @class */ (function (_super) {
    __extends(Circle13, _super);
    function Circle13(radius) {
        var _this = _super.call(this) || this;
        _this.radius = radius;
        return _this;
    }
    Circle13.prototype.area = function () {
        return Math.PI * this.radius * this.radius;
    };
    return Circle13;
}(Shape13));
/* =============================================================
 * BÀI 14: base class Employee - Manager, Developer
 * =============================================================
 */
var Employee14 = /** @class */ (function () {
    function Employee14(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    Employee14.prototype.work = function () {
        console.log("".concat(this.name, " \u0111ang l\u00E0m vi\u1EC7c"));
    };
    return Employee14;
}());
var Manager14 = /** @class */ (function (_super) {
    __extends(Manager14, _super);
    function Manager14() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Method riêng của Manager
    Manager14.prototype.manageTeam = function () {
        console.log("".concat(this.name, " \u0111ang qu\u1EA3n l\u00FD \u0111\u1ED9i nh\u00F3m"));
    };
    return Manager14;
}(Employee14));
var Developer14 = /** @class */ (function (_super) {
    __extends(Developer14, _super);
    function Developer14() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Method riêng của Developer
    Developer14.prototype.writeCode = function () {
        console.log("".concat(this.name, " \u0111ang vi\u1EBFt code"));
    };
    return Developer14;
}(Employee14));
/* =============================================================
 * BÀI 15: class Library chứa Book và User - method addBook()
 * =============================================================
 */
var Library15 = /** @class */ (function () {
    function Library15() {
        this.books = [];
        this.users = [];
    }
    Library15.prototype.addBook = function (book) {
        this.books.push(book);
        console.log("\u0110\u00E3 th\u00EAm s\u00E1ch: ".concat(book.title));
    };
    Library15.prototype.addUser = function (user) {
        this.users.push(user);
        console.log("\u0110\u00E3 th\u00EAm ng\u01B0\u1EDDi d\u00F9ng: ".concat(user.name));
    };
    Library15.prototype.listBooks = function () {
        this.books.forEach(function (b) { return b.display(); });
    };
    return Library15;
}());
/* =============================================================
 * BÀI 16: generic class Box<T> - lưu trữ bất kỳ kiểu dữ liệu nào
 * =============================================================
 */
var Box = /** @class */ (function () {
    function Box(value) {
        this.value = value;
    }
    Box.prototype.getValue = function () {
        return this.value;
    };
    Box.prototype.setValue = function (value) {
        this.value = value;
    };
    return Box;
}());
/* =============================================================
 * BÀI 17: singleton Logger - log message ra console
 * Singleton: đảm bảo cả chương trình chỉ có DUY NHẤT 1 instance
 * =============================================================
 */
var Logger = /** @class */ (function () {
    // constructor private -> bên ngoài không thể "new Logger()" trực tiếp
    function Logger() {
    }
    // Method static để lấy (hoặc tạo mới nếu chưa có) instance duy nhất
    Logger.getInstance = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.prototype.log = function (message) {
        console.log("[LOG] ".concat(message));
    };
    return Logger;
}());
// Cách dùng: Logger.getInstance().log("Xin chào");
/* =============================================================
 * BÀI 18: static class MathUtil - add, subtract, multiply, divide
 * TypeScript không có "static class" thật sự như C#, ta mô phỏng
 * bằng cách để tất cả method là static, không cần new instance.
 * =============================================================
 */
var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    MathUtil.add = function (a, b) {
        return a + b;
    };
    MathUtil.subtract = function (a, b) {
        return a - b;
    };
    MathUtil.multiply = function (a, b) {
        return a * b;
    };
    MathUtil.divide = function (a, b) {
        if (b === 0) {
            throw new Error("Không thể chia cho 0");
        }
        return a / b;
    };
    return MathUtil;
}());
// Cách dùng: MathUtil.add(2, 3) - không cần new MathUtil()
/* =============================================================
 * BÀI 19: Polymorphism (đa hình) - Animal và các lớp con
 * =============================================================
 */
var Animal19 = /** @class */ (function () {
    function Animal19(name) {
        this.name = name;
    }
    // Method cha, sẽ bị các lớp con "override" (ghi đè)
    Animal19.prototype.sound = function () {
        return "...";
    };
    return Animal19;
}());
var Dog19 = /** @class */ (function (_super) {
    __extends(Dog19, _super);
    function Dog19() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog19.prototype.sound = function () {
        return "Gâu gâu!";
    };
    return Dog19;
}(Animal19));
var Cat19 = /** @class */ (function (_super) {
    __extends(Cat19, _super);
    function Cat19() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat19.prototype.sound = function () {
        return "Meo meo!";
    };
    return Cat19;
}(Animal19));
function demoPolymorphism() {
    // Mảng khai báo kiểu Animal19 nhưng chứa các đối tượng Dog19/Cat19
    var animals = [new Dog19("Milu"), new Cat19("Mimi")];
    // Khi gọi animal.sound(), JS/TS tự động gọi đúng phiên bản
    // sound() của lớp con tương ứng -> đây chính là tính đa hình
    animals.forEach(function (a) { return console.log("".concat(a.name, ": ").concat(a.sound())); });
}
var Car20 = /** @class */ (function () {
    function Car20(brand) {
        this.brand = brand;
    }
    Car20.prototype.move = function () {
        console.log("".concat(this.brand, ": xe h\u01A1i \u0111ang ch\u1EA1y tr\u00EAn \u0111\u01B0\u1EDDng"));
    };
    return Car20;
}());
var Bike20 = /** @class */ (function () {
    function Bike20(brand) {
        this.brand = brand;
    }
    Bike20.prototype.move = function () {
        console.log("".concat(this.brand, ": xe \u0111\u1EA1p \u0111ang \u0111\u1EA1p"));
    };
    return Bike20;
}());
/* =============================================================
 * BÀI 21: generic class Repository<T> - add(), getAll()
 * Repository: mẫu thiết kế lưu trữ & truy xuất dữ liệu chung
 * =============================================================
 */
var Repository = /** @class */ (function () {
    function Repository() {
        this.items = [];
    }
    Repository.prototype.add = function (item) {
        this.items.push(item);
    };
    Repository.prototype.getAll = function () {
        return this.items;
    };
    return Repository;
}());
// Cách dùng: const bookRepo = new Repository<Book>();
/* =============================================================
 * BÀI 22: class Stack<T> - push, pop, peek, isEmpty
 * Stack: cấu trúc dữ liệu ngăn xếp (vào sau ra trước - LIFO)
 * =============================================================
 */
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    // Thêm phần tử lên đỉnh stack
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    // Lấy và xoá phần tử ở đỉnh stack
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    // Xem phần tử ở đỉnh stack mà không xoá
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    };
    // Kiểm tra stack có rỗng không
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    return Stack;
}());
var CashPayment = /** @class */ (function () {
    function CashPayment() {
    }
    CashPayment.prototype.pay = function (amount) {
        console.log("Thanh to\u00E1n ".concat(amount, " b\u1EB1ng ti\u1EC1n m\u1EB7t"));
    };
    return CashPayment;
}());
var CardPayment = /** @class */ (function () {
    function CardPayment() {
    }
    CardPayment.prototype.pay = function (amount) {
        console.log("Thanh to\u00E1n ".concat(amount, " b\u1EB1ng th\u1EBB"));
    };
    return CardPayment;
}());
/* =============================================================
 * BÀI 24: abstract class Appliance - turnOn() - Fan, AirConditioner
 * =============================================================
 */
var Appliance24 = /** @class */ (function () {
    function Appliance24() {
    }
    // Method chung, dùng lại được ở lớp con
    Appliance24.prototype.turnOff = function () {
        console.log("Thiết bị đã tắt");
    };
    return Appliance24;
}());
var Fan24 = /** @class */ (function (_super) {
    __extends(Fan24, _super);
    function Fan24() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fan24.prototype.turnOn = function () {
        console.log("Quạt đang bật, đang quay");
    };
    return Fan24;
}(Appliance24));
var AirConditioner24 = /** @class */ (function (_super) {
    __extends(AirConditioner24, _super);
    function AirConditioner24() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AirConditioner24.prototype.turnOn = function () {
        console.log("Máy lạnh đang bật, đang làm mát");
    };
    return AirConditioner24;
}(Appliance24));
/* =============================================================
 * BÀI 25: class Shape - static method describe()
 * =============================================================
 */
var Shape25 = /** @class */ (function () {
    function Shape25() {
    }
    // Method static: gọi trực tiếp qua tên class, không cần tạo instance
    Shape25.describe = function () {
        console.log("Shape là hình học tổng quát (có nhiều loại hình khác nhau)");
    };
    return Shape25;
}());
// Cách dùng: Shape25.describe();
/* =============================================================
 * BÀI 26: class Order - danh sách Product - tính tổng tiền
 * =============================================================
 */
var Order26 = /** @class */ (function () {
    function Order26() {
        this.products = [];
    }
    Order26.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    // reduce(): cộng dồn giá trị của tất cả sản phẩm trong đơn hàng
    Order26.prototype.calculateTotal = function () {
        return this.products.reduce(function (total, p) { return total + p.price; }, 0);
    };
    return Order26;
}());
/* =============================================================
 * BÀI 27: class Teacher extends Person - thêm subject, introduce()
 * =============================================================
 */
var Teacher27 = /** @class */ (function (_super) {
    __extends(Teacher27, _super);
    function Teacher27(name, age, subject) {
        var _this = _super.call(this, name, age) || this;
        _this.subject = subject;
        return _this;
    }
    Teacher27.prototype.introduce = function () {
        console.log("T\u00F4i t\u00EAn l\u00E0 ".concat(this.name, ", ").concat(this.age, " tu\u1ED5i, d\u1EA1y m\u00F4n ").concat(this.subject));
    };
    return Teacher27;
}(Person));
/* =============================================================
 * BÀI 28: class Animal - protected makeSound() - Dog, Cat override
 * protected: chỉ truy cập được trong class đó và các class con,
 * KHÔNG truy cập được từ bên ngoài (khác với private)
 * =============================================================
 */
var Animal28 = /** @class */ (function () {
    function Animal28(name) {
        this.name = name;
    }
    Animal28.prototype.makeSound = function () {
        return "...";
    };
    // Method public để "lộ" ra ngoài, bên trong gọi makeSound() (protected)
    Animal28.prototype.speak = function () {
        console.log("".concat(this.name, ": ").concat(this.makeSound()));
    };
    return Animal28;
}());
var Dog28 = /** @class */ (function (_super) {
    __extends(Dog28, _super);
    function Dog28() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog28.prototype.makeSound = function () {
        return "Gâu gâu!";
    };
    return Dog28;
}(Animal28));
var Cat28 = /** @class */ (function (_super) {
    __extends(Cat28, _super);
    function Cat28() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat28.prototype.makeSound = function () {
        return "Meo meo!";
    };
    return Cat28;
}(Animal28));
var Car29 = /** @class */ (function () {
    function Car29() {
    }
    Car29.prototype.move = function () {
        console.log("Xe hơi di chuyển bằng bánh xe");
    };
    return Car29;
}());
var Robot29 = /** @class */ (function () {
    function Robot29() {
    }
    Robot29.prototype.move = function () {
        console.log("Robot di chuyển bằng chân cơ khí");
    };
    return Robot29;
}());
/* =============================================================
 * BÀI 30: class School - danh sách Student và Teacher - display info
 * =============================================================
 */
var School30 = /** @class */ (function () {
    function School30() {
        this.students = [];
        this.teachers = [];
    }
    School30.prototype.addStudent = function (student) {
        this.students.push(student);
    };
    School30.prototype.addTeacher = function (teacher) {
        this.teachers.push(teacher);
    };
    School30.prototype.displayAll = function () {
        console.log("--- Danh sách học sinh ---");
        this.students.forEach(function (s) { return s.displayInfo(); });
        console.log("--- Danh sách giáo viên ---");
        this.teachers.forEach(function (t) { return t.introduce(); });
    };
    return School30;
}());
/* ========== Demo function to run all exercises ========== */
function runAllDemos() {
    console.log("\n===== BÀI 1 & 2 =====");
    {
        var student = new Student("An", 16, "10A1");
        student.displayInfo();
    }
    console.log("\n===== BÀI 3 =====");
    {
        var car = new Car3("Toyota", "Vios", 2023);
        car.showInfo();
    }
    console.log("\n===== BÀI 4 =====");
    {
        var rect = new Rectangle(5, 10);
        console.log("Di\u1EC7n t\u00EDch: ".concat(rect.area(), ", Chu vi: ").concat(rect.perimeter()));
    }
    console.log("\n===== BÀI 5 =====");
    {
        var acc = new BankAccount(100);
        acc.deposit(50);
        acc.withdraw(30);
        acc.withdraw(1000); // sẽ báo lỗi không đủ số dư
    }
    console.log("\n===== BÀI 6 =====");
    {
        var book = new Book("Dế Mèn Phiêu Lưu Ký", "Tô Hoài", 1941);
        book.display();
    }
    console.log("\n===== BÀI 7 =====");
    {
        var user = new User("Bình");
        console.log(user.name); // gọi getter
        user.name = "Bình Nguyễn"; // gọi setter
        console.log(user.name);
    }
    console.log("\n===== BÀI 8 =====");
    {
        var result = demoProductFilter();
        console.log("Sản phẩm giá > 100:", result.map(function (p) { return p.name; }));
    }
    console.log("\n===== BÀI 9 =====");
    {
        var dog = new Dog9("Lu");
        console.log("".concat(dog.name, ": ").concat(dog.sound()));
    }
    console.log("\n===== BÀI 10 =====");
    {
        var account = new Account10("user01", "123456", "ACC-001");
        console.log(account.username, account.accountId);
        console.log("Mật khẩu đúng?", account.checkPassword("123456"));
    }
    console.log("\n===== BÀI 11 =====");
    {
        var dog = new Dog11("Rex");
        var cat = new Cat11("Kitty");
        dog.bark();
        cat.meow();
    }
    console.log("\n===== BÀI 12 =====");
    {
        var duck = new Duck12();
        duck.fly();
        duck.swim();
    }
    console.log("\n===== BÀI 13 =====");
    {
        var shapes = [new Square13(4), new Circle13(3)];
        shapes.forEach(function (s) { return s.describe(); });
    }
    console.log("\n===== BÀI 14 =====");
    {
        var manager = new Manager14("Hùng", 2000);
        var dev = new Developer14("Lan", 1800);
        manager.manageTeam();
        dev.writeCode();
    }
    console.log("\n===== BÀI 15 =====");
    {
        var library = new Library15();
        library.addBook(new Book("Sapiens", "Yuval Noah Harari", 2011));
        library.addUser(new User("Nam"));
        library.listBooks();
    }
    console.log("\n===== BÀI 16 =====");
    {
        var numberBox = new Box(123);
        var stringBox = new Box("hello");
        console.log(numberBox.getValue(), stringBox.getValue());
    }
    console.log("\n===== BÀI 17 =====");
    {
        Logger.getInstance().log("Ứng dụng đã khởi động");
        Logger.getInstance().log("Đây vẫn là cùng 1 instance");
    }
    console.log("\n===== BÀI 18 =====");
    {
        console.log(MathUtil.add(3, 4), MathUtil.divide(10, 2));
    }
    console.log("\n===== BÀI 19 =====");
    demoPolymorphism();
    console.log("\n===== BÀI 20 =====");
    {
        var vehicles = [new Car20("Honda"), new Bike20("Giant")];
        vehicles.forEach(function (v) { return v.move(); });
    }
    console.log("\n===== BÀI 21 =====");
    {
        var repo = new Repository();
        repo.add(new Product("Sách", 200));
        console.log(repo.getAll());
    }
    console.log("\n===== BÀI 22 =====");
    {
        var stack = new Stack();
        stack.push(1);
        stack.push(2);
        console.log("Đỉnh stack:", stack.peek());
        console.log("Pop:", stack.pop());
        console.log("Rỗng?", stack.isEmpty());
    }
    console.log("\n===== BÀI 23 =====");
    {
        var payments = [new CashPayment(), new CardPayment()];
        payments.forEach(function (p) { return p.pay(100); });
    }
    console.log("\n===== BÀI 24 =====");
    {
        var fan = new Fan24();
        var ac = new AirConditioner24();
        fan.turnOn();
        ac.turnOn();
    }
    console.log("\n===== BÀI 25 =====");
    Shape25.describe();
    console.log("\n===== BÀI 26 =====");
    {
        var order = new Order26();
        order.addProduct(new Product("Áo", 150));
        order.addProduct(new Product("Quần", 250));
        console.log("Tổng tiền đơn hàng:", order.calculateTotal());
    }
    console.log("\n===== BÀI 27 =====");
    {
        var teacher = new Teacher27("Cô Hoa", 35, "Toán");
        teacher.introduce();
    }
    console.log("\n===== BÀI 28 =====");
    {
        var dog = new Dog28("Milu");
        var cat = new Cat28("Mimi");
        dog.speak();
        cat.speak();
    }
    console.log("\n===== BÀI 29 =====");
    {
        var movables = [new Car29(), new Robot29()];
        movables.forEach(function (m) { return m.move(); });
    }
    console.log("\n===== BÀI 30 =====");
    {
        var school = new School30();
        school.addStudent(new Student("Mai", 15, "9A1"));
        school.addTeacher(new Teacher27("Thầy Long", 40, "Lý"));
        school.displayAll();
    }
}
runAllDemos();
