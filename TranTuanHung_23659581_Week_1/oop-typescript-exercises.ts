
/* =============================================================
 * BÀI 1: Class Person - name, age - method display()
 * =============================================================
 */
class Person {
  // Thuộc tính (property) của lớp
  name: string;
  age: number;

  // Constructor: hàm khởi tạo, chạy khi dùng "new Person(...)"
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method hiển thị thông tin
  display(): void {
    console.log(`[Person] Tên: ${this.name}, Tuổi: ${this.age}`);
  }
}

/* =============================================================
 * BÀI 2: Class Student extends Person - thêm grade
 * =============================================================
 */
class Student extends Person {
  grade: string; // lớp/khối/điểm - tuỳ ngữ cảnh, ở đây coi là "lớp học"

  constructor(name: string, age: number, grade: string) {
    // super(...) gọi constructor của lớp cha (Person)
    super(name, age);
    this.grade = grade;
  }

  // Ghi đè / bổ sung method để hiển thị đầy đủ thông tin
  displayInfo(): void {
    // Có thể tái sử dụng lại logic của cha bằng super.display()
    super.display();
    console.log(`[Student] Lớp: ${this.grade}`);
  }
}


/* =============================================================
 * BÀI 3: Class Car - brand, model, year - method showInfo()
 * =============================================================
 */
class Car3 {
  brand: string;
  model: string;
  year: number;
 
  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
 
  showInfo(): void {
    console.log(`[Car] ${this.brand} ${this.model} (${this.year})`);
  }
}


/* =============================================================
 * BÀI 4: Class Rectangle - width, height - area(), perimeter()
 * =============================================================
 */
class Rectangle {
  width: number;
  height: number;
 
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
 
  // Diện tích = dài x rộng
  area(): number {
    return this.width * this.height;
  }
 
  // Chu vi = 2 x (dài + rộng)
  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

 
/* =============================================================
 * BÀI 5: Class BankAccount - balance - deposit(), withdraw()
 * =============================================================
 */
class BankAccount {
  // private: chỉ truy cập được bên trong class, không cho sửa
  // trực tiếp từ bên ngoài (tránh set balance âm tuỳ tiện)
  private balance: number;
 
  constructor(initialBalance: number = 0) {
    this.balance = initialBalance;
  }
 
  // Nạp tiền
  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Số tiền nạp phải > 0");
      return;
    }
    this.balance += amount;
    console.log(`Đã nạp ${amount}. Số dư hiện tại: ${this.balance}`);
  }
 
  // Rút tiền - kiểm tra đủ số dư mới cho rút
  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Số tiền rút phải > 0");
      return;
    }
    if (amount > this.balance) {
      console.log("Số dư không đủ để rút!");
      return;
    }
    this.balance -= amount;
    console.log(`Đã rút ${amount}. Số dư hiện tại: ${this.balance}`);
  }
 
  getBalance(): number {
    return this.balance;
  }
}


/* =============================================================
 * BÀI 6: Class Book - title, author, year
 * =============================================================
 */
class Book {
  title: string;
  author: string;
  year: number;
 
  constructor(title: string, author: string, year: number) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
 
  display(): void {
    console.log(`[Book] "${this.title}" - ${this.author} (${this.year})`);
  }
}

/* =============================================================
 * BÀI 7: Class User - private name + getter/setter
 * =============================================================
 */
class User {
  // Thuộc tính private, đặt tên có "_" phía trước theo quy ước
  // để phân biệt với getter/setter cùng tên "name"
  private _name: string;
 
  constructor(name: string) {
    this._name = name;
  }
 
  // Getter: cho phép đọc giá trị thông qua "user.name" (không cần dấu ())
  get name(): string {
    return this._name;
  }
 
  // Setter: cho phép gán giá trị thông qua "user.name = ..."
  // Ở đây có thể thêm điều kiện kiểm tra hợp lệ trước khi gán
  set name(value: string) {
    if (value.trim().length === 0) {
      console.log("Tên không được để trống!");
      return;
    }
    this._name = value;
  }
}


/* =============================================================
 * BÀI 8: Class Product - name, price
 * Tạo mảng Product và lọc sản phẩm có price > 100
 * =============================================================
 */
class Product {
  name: string;
  price: number;
 
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}
 
function demoProductFilter(): Product[] {
  const products: Product[] = [
    new Product("Chuột", 50),
    new Product("Bàn phím", 150),
    new Product("Màn hình", 3200000 > 100 ? 3200000 : 0), // ví dụ giá lớn
    new Product("Tai nghe", 90),
  ];
 
  // filter(): duyệt qua mảng, giữ lại phần tử thoả điều kiện
  const expensiveProducts = products.filter((p) => p.price > 100);
  return expensiveProducts;
}

/* =============================================================
 * BÀI 9: Interface Animal - name + method sound()
 * Interface chỉ khai báo "hình dạng", không có code cụ thể
 * =============================================================
 */
interface IAnimal9 {
  name: string;
  sound(): string;
}
 
// Ví dụ 1 class implement interface trên
class Dog9 implements IAnimal9 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sound(): string {
    return "Gâu gâu!";
  }
}

/* =============================================================
 * BÀI 10: Class Account - public, private, readonly
 * =============================================================
 */
class Account10 {
  public username: string; // truy cập tự do từ mọi nơi
  private password: string; // chỉ truy cập trong class
  readonly accountId: string; // chỉ gán 1 lần lúc khởi tạo, sau đó không đổi được
 
  constructor(username: string, password: string, accountId: string) {
    this.username = username;
    this.password = password;
    this.accountId = accountId;
  }
 
  // Vì password là private, muốn kiểm tra phải qua method công khai
  checkPassword(input: string): boolean {
    return input === this.password;
  }
}

/* =============================================================
 * BÀI 11: base class Animal, extend Dog (bark), Cat (meow)
 * =============================================================
 */
class Animal11 {
  constructor(public name: string) {}
  // "public name: string" trong constructor là cú pháp rút gọn
  // TypeScript, tự động tạo property + gán giá trị luôn.
}
 
class Dog11 extends Animal11 {
  bark(): void {
    console.log(`${this.name} sủa: Gâu gâu!`);
  }
}
 
class Cat11 extends Animal11 {
  meow(): void {
    console.log(`${this.name} kêu: Meo meo!`);
  }
}


/* =============================================================
 * BÀI 12: interfaces Flyable, Swimmable - Bird, Fish implement
 * =============================================================
 */
interface Flyable {
  fly(): void;
}
interface Swimmable {
  swim(): void;
}
 
class Bird12 implements Flyable {
  fly(): void {
    console.log("Chim đang bay");
  }
}
 
class Fish12 implements Swimmable {
  swim(): void {
    console.log("Cá đang bơi");
  }
}
 
// Một class có thể implement NHIỀU interface cùng lúc (đa hình interface)
class Duck12 implements Flyable, Swimmable {
  fly(): void {
    console.log("Vịt đang bay");
  }
  swim(): void {
    console.log("Vịt đang bơi");
  }
}

/* =============================================================
 * BÀI 13: abstract class Shape - area() - Square, Circle
 * abstract class: không thể new trực tiếp, chỉ dùng để kế thừa
 * =============================================================
 */
abstract class Shape13 {
  // Method abstract: bắt buộc lớp con phải tự cài đặt (implement)
  abstract area(): number;
 
  // Method thường: lớp con dùng chung, không cần viết lại
  describe(): void {
    console.log(`Diện tích: ${this.area().toFixed(2)}`);
  }
}
 
class Square13 extends Shape13 {
  constructor(private side: number) {
    super();
  }
  area(): number {
    return this.side * this.side;
  }
}
 
class Circle13 extends Shape13 {
  constructor(private radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

/* =============================================================
 * BÀI 14: base class Employee - Manager, Developer
 * =============================================================
 */
class Employee14 {
  constructor(public name: string, public salary: number) {}
 
  work(): void {
    console.log(`${this.name} đang làm việc`);
  }
}
 
class Manager14 extends Employee14 {
  // Method riêng của Manager
  manageTeam(): void {
    console.log(`${this.name} đang quản lý đội nhóm`);
  }
}
 
class Developer14 extends Employee14 {
  // Method riêng của Developer
  writeCode(): void {
    console.log(`${this.name} đang viết code`);
  }
}


/* =============================================================
 * BÀI 15: class Library chứa Book và User - method addBook()
 * =============================================================
 */
class Library15 {
  private books: Book[] = [];
  private users: User[] = [];
 
  addBook(book: Book): void {
    this.books.push(book);
    console.log(`Đã thêm sách: ${book.title}`);
  }
 
  addUser(user: User): void {
    this.users.push(user);
    console.log(`Đã thêm người dùng: ${user.name}`);
  }
 
  listBooks(): void {
    this.books.forEach((b) => b.display());
  }
}


/* =============================================================
 * BÀI 16: generic class Box<T> - lưu trữ bất kỳ kiểu dữ liệu nào
 * =============================================================
 */
class Box<T> {
  private value: T;
 
  constructor(value: T) {
    this.value = value;
  }
 
  getValue(): T {
    return this.value;
  }
 
  setValue(value: T): void {
    this.value = value;
  }
}


/* =============================================================
 * BÀI 17: singleton Logger - log message ra console
 * Singleton: đảm bảo cả chương trình chỉ có DUY NHẤT 1 instance
 * =============================================================
 */
class Logger {
  // instance được lưu tĩnh (static), dùng chung cho mọi nơi gọi
  private static instance: Logger;
 
  // constructor private -> bên ngoài không thể "new Logger()" trực tiếp
  private constructor() {}
 
  // Method static để lấy (hoặc tạo mới nếu chưa có) instance duy nhất
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
 
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}
// Cách dùng: Logger.getInstance().log("Xin chào");

/* =============================================================
 * BÀI 18: static class MathUtil - add, subtract, multiply, divide
 * TypeScript không có "static class" thật sự như C#, ta mô phỏng
 * bằng cách để tất cả method là static, không cần new instance.
 * =============================================================
 */
class MathUtil {
  static add(a: number, b: number): number {
    return a + b;
  }
  static subtract(a: number, b: number): number {
    return a - b;
  }
  static multiply(a: number, b: number): number {
    return a * b;
  }
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Không thể chia cho 0");
    }
    return a / b;
  }
}
// Cách dùng: MathUtil.add(2, 3) - không cần new MathUtil()


/* =============================================================
 * BÀI 19: Polymorphism (đa hình) - Animal và các lớp con
 * =============================================================
 */
class Animal19 {
  constructor(public name: string) {}
 
  // Method cha, sẽ bị các lớp con "override" (ghi đè)
  sound(): string {
    return "...";
  }
}
 
class Dog19 extends Animal19 {
  override sound(): string {
    return "Gâu gâu!";
  }
}
 
class Cat19 extends Animal19 {
  override sound(): string {
    return "Meo meo!";
  }
}
 
function demoPolymorphism(): void {
  // Mảng khai báo kiểu Animal19 nhưng chứa các đối tượng Dog19/Cat19
  const animals: Animal19[] = [new Dog19("Milu"), new Cat19("Mimi")];
 
  // Khi gọi animal.sound(), JS/TS tự động gọi đúng phiên bản
  // sound() của lớp con tương ứng -> đây chính là tính đa hình
  animals.forEach((a) => console.log(`${a.name}: ${a.sound()}`));
}

/* =============================================================
 * BÀI 20: interface Vehicle - implement ở Car, Bike
 * =============================================================
 */
interface Vehicle {
  brand: string;
  move(): void;
}
 
class Car20 implements Vehicle {
  constructor(public brand: string) {}
  move(): void {
    console.log(`${this.brand}: xe hơi đang chạy trên đường`);
  }
}
 
class Bike20 implements Vehicle {
  constructor(public brand: string) {}
  move(): void {
    console.log(`${this.brand}: xe đạp đang đạp`);
  }
}

/* =============================================================
 * BÀI 21: generic class Repository<T> - add(), getAll()
 * Repository: mẫu thiết kế lưu trữ & truy xuất dữ liệu chung
 * =============================================================
 */
class Repository<T> {
  private items: T[] = [];
 
  add(item: T): void {
    this.items.push(item);
  }
 
  getAll(): T[] {
    return this.items;
  }
}
// Cách dùng: const bookRepo = new Repository<Book>();

/* =============================================================
 * BÀI 22: class Stack<T> - push, pop, peek, isEmpty
 * Stack: cấu trúc dữ liệu ngăn xếp (vào sau ra trước - LIFO)
 * =============================================================
 */
class Stack<T> {
  private items: T[] = [];
 
  // Thêm phần tử lên đỉnh stack
  push(item: T): void {
    this.items.push(item);
  }
 
  // Lấy và xoá phần tử ở đỉnh stack
  pop(): T | undefined {
    return this.items.pop();
  }
 
  // Xem phần tử ở đỉnh stack mà không xoá
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
 
  // Kiểm tra stack có rỗng không
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

/* =============================================================
 * BÀI 23: interface Payment - pay(amount) - CashPayment, CardPayment
 * =============================================================
 */
interface Payment {
  pay(amount: number): void;
}
 
class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng tiền mặt`);
  }
}
 
class CardPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng thẻ`);
  }
}

/* =============================================================
 * BÀI 24: abstract class Appliance - turnOn() - Fan, AirConditioner
 * =============================================================
 */
abstract class Appliance24 {
  abstract turnOn(): void;
 
  // Method chung, dùng lại được ở lớp con
  turnOff(): void {
    console.log("Thiết bị đã tắt");
  }
}
 
class Fan24 extends Appliance24 {
  turnOn(): void {
    console.log("Quạt đang bật, đang quay");
  }
}
 
class AirConditioner24 extends Appliance24 {
  turnOn(): void {
    console.log("Máy lạnh đang bật, đang làm mát");
  }
}


/* =============================================================
 * BÀI 25: class Shape - static method describe()
 * =============================================================
 */
class Shape25 {
  // Method static: gọi trực tiếp qua tên class, không cần tạo instance
  static describe(): void {
    console.log("Shape là hình học tổng quát (có nhiều loại hình khác nhau)");
  }
}
// Cách dùng: Shape25.describe();


/* =============================================================
 * BÀI 26: class Order - danh sách Product - tính tổng tiền
 * =============================================================
 */
class Order26 {
  private products: Product[] = [];
 
  addProduct(product: Product): void {
    this.products.push(product);
  }
 
  // reduce(): cộng dồn giá trị của tất cả sản phẩm trong đơn hàng
  calculateTotal(): number {
    return this.products.reduce((total, p) => total + p.price, 0);
  }
}

/* =============================================================
 * BÀI 27: class Teacher extends Person - thêm subject, introduce()
 * =============================================================
 */
class Teacher27 extends Person {
  subject: string;
 
  constructor(name: string, age: number, subject: string) {
    super(name, age);
    this.subject = subject;
  }
 
  introduce(): void {
    console.log(
      `Tôi tên là ${this.name}, ${this.age} tuổi, dạy môn ${this.subject}`
    );
  }
}

/* =============================================================
 * BÀI 28: class Animal - protected makeSound() - Dog, Cat override
 * protected: chỉ truy cập được trong class đó và các class con,
 * KHÔNG truy cập được từ bên ngoài (khác với private)
 * =============================================================
 */
class Animal28 {
  constructor(public name: string) {}
 
  protected makeSound(): string {
    return "...";
  }
 
  // Method public để "lộ" ra ngoài, bên trong gọi makeSound() (protected)
  speak(): void {
    console.log(`${this.name}: ${this.makeSound()}`);
  }
}
 
class Dog28 extends Animal28 {
  protected override makeSound(): string {
    return "Gâu gâu!";
  }
}
 
class Cat28 extends Animal28 {
  protected override makeSound(): string {
    return "Meo meo!";
  }
}

/* =============================================================
 * BÀI 29: interface Movable - move() - Car, Robot implement
 * =============================================================
 */
interface Movable29 {
  move(): void;
}
 
class Car29 implements Movable29 {
  move(): void {
    console.log("Xe hơi di chuyển bằng bánh xe");
  }
}
 
class Robot29 implements Movable29 {
  move(): void {
    console.log("Robot di chuyển bằng chân cơ khí");
  }
}


/* =============================================================
 * BÀI 30: class School - danh sách Student và Teacher - display info
 * =============================================================
 */
class School30 {
  private students: Student[] = [];
  private teachers: Teacher27[] = [];
 
  addStudent(student: Student): void {
    this.students.push(student);
  }
 
  addTeacher(teacher: Teacher27): void {
    this.teachers.push(teacher);
  }
 
  displayAll(): void {
    console.log("--- Danh sách học sinh ---");
    this.students.forEach((s) => s.displayInfo());
 
    console.log("--- Danh sách giáo viên ---");
    this.teachers.forEach((t) => t.introduce());
  }
}


/* ========== Demo function to run all exercises ========== */

function runAllDemos(): void {
  console.log("\n===== BÀI 1 & 2 =====");
  {
    const student = new Student("An", 16, "10A1");
    student.displayInfo();
  }

  console.log("\n===== BÀI 3 =====");
  {
    const car = new Car3("Toyota", "Vios", 2023);
    car.showInfo();
  }

  console.log("\n===== BÀI 4 =====");
  {
    const rect = new Rectangle(5, 10);
    console.log(`Diện tích: ${rect.area()}, Chu vi: ${rect.perimeter()}`);
  }


  console.log("\n===== BÀI 5 =====");
  {
    const acc = new BankAccount(100);
    acc.deposit(50);
    acc.withdraw(30);
    acc.withdraw(1000); // sẽ báo lỗi không đủ số dư
  }

  console.log("\n===== BÀI 6 =====");
  {
    const book = new Book("Dế Mèn Phiêu Lưu Ký", "Tô Hoài", 1941);
    book.display();
  }

  console.log("\n===== BÀI 7 =====");
  {
    const user = new User("Bình");
    console.log(user.name); // gọi getter
    user.name = "Bình Nguyễn"; // gọi setter
    console.log(user.name);
  }

   console.log("\n===== BÀI 8 =====");
  {
    const result = demoProductFilter();
    console.log(
      "Sản phẩm giá > 100:",
      result.map((p) => p.name)
    );
  }

  console.log("\n===== BÀI 9 =====");
  {
    const dog = new Dog9("Lu");
    console.log(`${dog.name}: ${dog.sound()}`);
  }

  console.log("\n===== BÀI 10 =====");
  {
    const account = new Account10("user01", "123456", "ACC-001");
    console.log(account.username, account.accountId);
    console.log("Mật khẩu đúng?", account.checkPassword("123456"));
  }

  console.log("\n===== BÀI 11 =====");
  {
    const dog = new Dog11("Rex");
    const cat = new Cat11("Kitty");
    dog.bark();
    cat.meow();
  }

  console.log("\n===== BÀI 12 =====");
  {
    const duck = new Duck12();
    duck.fly();
    duck.swim();
  }

   console.log("\n===== BÀI 13 =====");
  {
    const shapes: Shape13[] = [new Square13(4), new Circle13(3)];
    shapes.forEach((s) => s.describe());
  }

  console.log("\n===== BÀI 14 =====");
  {
    const manager = new Manager14("Hùng", 2000);
    const dev = new Developer14("Lan", 1800);
    manager.manageTeam();
    dev.writeCode();
  }

  console.log("\n===== BÀI 15 =====");
  {
    const library = new Library15();
    library.addBook(new Book("Sapiens", "Yuval Noah Harari", 2011));
    library.addUser(new User("Nam"));
    library.listBooks();
  }

  console.log("\n===== BÀI 16 =====");
  {
    const numberBox = new Box<number>(123);
    const stringBox = new Box<string>("hello");
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
    const vehicles: Vehicle[] = [new Car20("Honda"), new Bike20("Giant")];
    vehicles.forEach((v) => v.move());
  }

   console.log("\n===== BÀI 21 =====");
  {
    const repo = new Repository<Product>();
    repo.add(new Product("Sách", 200));
    console.log(repo.getAll());
  }

  console.log("\n===== BÀI 22 =====");
  {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    console.log("Đỉnh stack:", stack.peek());
    console.log("Pop:", stack.pop());
    console.log("Rỗng?", stack.isEmpty());
  }

   console.log("\n===== BÀI 23 =====");
  {
    const payments: Payment[] = [new CashPayment(), new CardPayment()];
    payments.forEach((p) => p.pay(100));
  }

  console.log("\n===== BÀI 24 =====");
  {
    const fan = new Fan24();
    const ac = new AirConditioner24();
    fan.turnOn();
    ac.turnOn();
  }

  console.log("\n===== BÀI 25 =====");
  Shape25.describe();

  console.log("\n===== BÀI 26 =====");
  {
    const order = new Order26();
    order.addProduct(new Product("Áo", 150));
    order.addProduct(new Product("Quần", 250));
    console.log("Tổng tiền đơn hàng:", order.calculateTotal());
  }

  console.log("\n===== BÀI 27 =====");
  {
    const teacher = new Teacher27("Cô Hoa", 35, "Toán");
    teacher.introduce();
  }

  console.log("\n===== BÀI 28 =====");
  {
    const dog = new Dog28("Milu");
    const cat = new Cat28("Mimi");
    dog.speak();
    cat.speak();
  }

  console.log("\n===== BÀI 29 =====");
  {
    const movables: Movable29[] = [new Car29(), new Robot29()];
    movables.forEach((m) => m.move());
  }

  console.log("\n===== BÀI 30 =====");
  {
    const school = new School30();
    school.addStudent(new Student("Mai", 15, "9A1"));
    school.addTeacher(new Teacher27("Thầy Long", 40, "Lý"));
    school.displayAll();
  }

}

runAllDemos();
