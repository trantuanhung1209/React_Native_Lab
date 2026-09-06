/**
 * =============================================================
 *  30 BÀI TẬP ASYNC/AWAIT & PROMISE VỚI TYPESCRIPT
 *  (giải theo file 2_Async_Exercises_TypeScript.pdf)
 * =============================================================
 * Cấu trúc: A. Promise cơ bản (1-10) | B. Async/Await (11-20)
 *           C. Fetch API & I/O giả lập (21-30)
 *
 * LƯU Ý VỀ CẤU HÌNH (tsconfig.json):
 * - "target": "ES2020" trở lên (để dùng for-await-of, Promise.allSettled)
 * - Cài @types/node bản ổn định (VD 20.14.10) để có type cho `fetch`,
 *   `setTimeout`... toàn cục mà không cần thêm "dom" vào "lib".
 *
 * LƯU Ý VỀ MẠNG:
 * - Các bài phần C (21-30) gọi tới https://jsonplaceholder.typicode.com
 *   nên máy bạn cần có kết nối Internet thì mới chạy được. Nếu không có
 *   mạng, các hàm này vẫn biên dịch (compile) đúng, chỉ là khi CHẠY sẽ
 *   báo lỗi kết nối - đó là bình thường, không phải lỗi code.
 * =============================================================
 */

/* =============================================================
 * PHẦN A: PROMISE CƠ BẢN
 * =============================================================
 */

/**
 * Bài 1: Tạo 1 Promise trả về chuỗi "Hello Async" sau 2 giây.
 * new Promise((resolve, reject) => {...}) là cách tạo Promise thủ công.
 * Bên trong, ta gọi resolve(value) khi thành công, reject(error) khi lỗi.
 */
function helloAsync(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
  });
}

/**
 * Bài 2: Hàm trả về Promise, resolve số 10 sau 1 giây.
 */
function getTen(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

/**
 * Bài 3: Hàm trả về Promise bị reject (lỗi) sau 1 giây.
 * Promise<never> nghĩa là Promise này không bao giờ resolve thành công,
 * chỉ có thể reject.
 */
function willFail(): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error("Something went wrong")), 1000);
  });
}

/**
 * Bài 4: Dùng .then() / .catch() để xử lý Promise trả về số ngẫu nhiên.
 */
function getRandomNumber(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Math.floor(Math.random() * 100)), 500);
  });
}

function demo4(): void {
  getRandomNumber()
    .then((num) => console.log("Bài 4 - Số ngẫu nhiên:", num))
    .catch((err) => console.error("Bài 4 - Lỗi:", err));
}

/**
 * Bài 5: simulateTask(time) - trả về Promise resolve "Task done" sau
 * "time" mili-giây. Đây là hàm mô phỏng 1 tác vụ bất kỳ tốn thời gian
 * (sẽ được dùng lại ở rất nhiều bài phía sau).
 */
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

/**
 * Bài 6: Promise.all() - chạy song song nhiều Promise, chỉ hoàn thành
 * khi TẤT CẢ đều resolve (nếu 1 cái reject thì Promise.all cũng reject
 * ngay lập tức).
 */
function demo6(): void {
  Promise.all([simulateTask(1000), simulateTask(500), simulateTask(1500)]).then(
    (results) => {
      // results là mảng kết quả, đúng theo thứ tự truyền vào (không
      // phải theo thứ tự hoàn thành trước/sau)
      console.log("Bài 6 - Promise.all:", results);
    }
  );
}

/**
 * Bài 7: Promise.race() - trả về Promise nào HOÀN THÀNH TRƯỚC (dù
 * thành công hay thất bại), các Promise còn lại vẫn chạy ngầm nhưng
 * kết quả của chúng bị bỏ qua.
 */
function demo7(): void {
  Promise.race([simulateTask(2000), simulateTask(300)]).then((result) => {
    console.log("Bài 7 - Promise nhanh nhất:", result);
  });
}

/**
 * Bài 8: Chuỗi Promise (Promise chaining) - bình phương 2, nhân đôi,
 * cộng 5. Mỗi .then() nhận kết quả của bước trước và trả về Promise
 * mới cho bước sau.
 */
function square(n: number): Promise<number> {
  return new Promise((resolve) => resolve(n * n));
}
function double(n: number): Promise<number> {
  return new Promise((resolve) => resolve(n * 2));
}
function addFive(n: number): Promise<number> {
  return new Promise((resolve) => resolve(n + 5));
}

function demo8(): void {
  // 2 -> bình phương = 4 -> nhân đôi = 8 -> cộng 5 = 13
  square(2)
    .then((result) => double(result))
    .then((result) => addFive(result))
    .then((finalResult) => console.log("Bài 8 - Kết quả chuỗi:", finalResult));
}

/**
 * Bài 9: Promise đọc 1 mảng sau 1 giây rồi lọc ra các số chẵn.
 */
function readArrayAndFilterEven(): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      resolve(arr.filter((n) => n % 2 === 0));
    }, 1000);
  });
}

/**
 * Bài 10: Dùng .finally() để log "Done" khi Promise kết thúc, dù
 * thành công hay thất bại. .finally() luôn chạy sau .then()/.catch().
 */
function demo10(): void {
  simulateTask(800)
    .then((result) => console.log("Bài 10 - Kết quả:", result))
    .catch((err) => console.error("Bài 10 - Lỗi:", err))
    .finally(() => console.log("Bài 10 - Done"));
}

/* =============================================================
 * PHẦN B: ASYNC/AWAIT
 * =============================================================
 */

/**
 * Bài 11: Chuyển bài 1 sang dùng async/await.
 * "async function" luôn trả về 1 Promise. "await" tạm dừng hàm cho
 * tới khi Promise bên phải nó resolve, rồi lấy giá trị resolve ra.
 */
async function demo11(): Promise<void> {
  const message = await helloAsync();
  console.log("Bài 11 -", message);
}

/**
 * Bài 12: Hàm async gọi simulateTask(2000) rồi log kết quả.
 */
async function demo12(): Promise<void> {
  const result = await simulateTask(2000);
  console.log("Bài 12 -", result);
}

/**
 * Bài 13: Xử lý lỗi bằng try/catch với async/await - cách viết này
 * tương đương .catch() nhưng đọc tự nhiên hơn (giống code đồng bộ).
 */
async function demo13(): Promise<void> {
  try {
    await willFail();
  } catch (err) {
    console.error("Bài 13 - Bắt được lỗi:", (err as Error).message);
  }
}

/**
 * Bài 14: Hàm async nhận 1 số, chờ 1 giây, rồi trả về số đó nhân 3.
 */
async function tripleAfterDelay(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

/**
 * Bài 15: Gọi nhiều hàm async TUẦN TỰ (sequential) bằng await - mỗi
 * lệnh await phải chờ xong mới chạy tới lệnh await tiếp theo, nên
 * tổng thời gian = tổng thời gian của từng tác vụ cộng lại.
 */
async function demo15(): Promise<void> {
  const r1 = await simulateTask(500);
  const r2 = await simulateTask(500);
  const r3 = await simulateTask(500);
  console.log("Bài 15 - Tuần tự:", r1, r2, r3);
}

/**
 * Bài 16: Gọi nhiều hàm async SONG SONG (parallel) bằng Promise.all().
 * Khác bài 15: các Promise được TẠO trước (bắt đầu chạy ngay), rồi mới
 * await Promise.all - nên tổng thời gian = thời gian tác vụ LÂU NHẤT,
 * không phải tổng cộng.
 */
async function demo16(): Promise<void> {
  const [r1, r2, r3] = await Promise.all([
    simulateTask(500),
    simulateTask(700),
    simulateTask(300),
  ]);
  console.log("Bài 16 - Song song:", r1, r2, r3);
}

/**
 * Bài 17: Dùng "for await...of" để duyệt qua 1 mảng các Promise, in
 * kết quả của từng Promise ngay khi nó resolve (theo đúng thứ tự
 * trong mảng, không phải thứ tự hoàn thành trước/sau).
 */
async function demo17(): Promise<void> {
  const tasks = [simulateTask(300), simulateTask(600), simulateTask(100)];
  for await (const result of tasks) {
    console.log("Bài 17 - Hoàn thành:", result);
  }
}

/**
 * Bài 18: fetchUser(id) - mô phỏng gọi API, resolve về 1 object user
 * sau 1 giây.
 */
interface UserData {
  id: number;
  name: string;
}

function fetchUser(id: number): Promise<UserData> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), 1000);
  });
}

/**
 * Bài 19: fetchUsers(ids) - gọi fetchUser cho từng id, chạy song song
 * bằng Promise.all() kết hợp với .map().
 */
async function fetchUsers(ids: number[]): Promise<UserData[]> {
  const users = await Promise.all(ids.map((id) => fetchUser(id)));
  return users;
}

/**
 * Bài 20: Thêm timeout cho lệnh gọi API - nếu quá 2 giây thì ném lỗi.
 * Kỹ thuật: dùng Promise.race() giữa Promise thật (fetchUser) và 1
 * Promise "đồng hồ đếm ngược" sẽ reject nếu tới hạn mà chưa xong.
 */
function fetchUserWithTimeout(
  id: number,
  timeoutMs: number = 2000
): Promise<UserData> {
  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    setTimeout(() => reject(new Error("Timeout: API call quá 2 giây")), timeoutMs);
  });
  return Promise.race([fetchUser(id), timeoutPromise]);
}

/**
 * Bài 21: Dùng fetch để lấy dữ liệu từ API công khai.
 * fetch() trả về Promise<Response>; gọi .json() để lấy dữ liệu dạng
 * JSON (cũng trả về 1 Promise nên phải await thêm lần nữa).
 */
async function demo21(): Promise<void> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log("Bài 21 -", data);
}

/**
 * Bài 22: Gọi API nhiều lần rồi log từng kết quả (ở đây gọi tuần tự
 * bằng vòng lặp + await; có thể đổi sang song song bằng Promise.all
 * như bài 16 nếu muốn nhanh hơn).
 */
async function demo22(): Promise<void> {
  for (let i = 1; i <= 3; i++) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${i}`
    );
    const data = await response.json();
    console.log(`Bài 22 - Todo ${i}:`, data);
  }
}

/**
 * Bài 23: Lấy danh sách todos rồi lọc ra các todo CHƯA hoàn thành.
 */
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function fetchIncompleteTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await response.json();
  return todos.filter((t) => !t.completed);
}

/**
 * Bài 24: postData() - gửi request POST tới API thử nghiệm.
 */
async function postData(): Promise<any> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
  });
  return response.json();
}

/**
 * Bài 25: downloadFile - mô phỏng tải file mất 3 giây, log khi xong.
 */
function downloadFile(): Promise<void> {
  return new Promise((resolve) => {
    console.log("Bài 25 - Bắt đầu tải file...");
    setTimeout(() => {
      console.log("Bài 25 - Tải file xong!");
      resolve();
    }, 3000);
  });
}

/**
 * Bài 26: Dùng async/await kết hợp setTimeout để mô phỏng chờ 5 giây.
 * wait(ms) là 1 hàm tiện ích rất hay dùng: biến setTimeout (callback)
 * thành 1 Promise để có thể await được.
 */
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo26(): Promise<void> {
  console.log("Bài 26 - Bắt đầu chờ 5 giây...");
  await wait(5000);
  console.log("Bài 26 - Đã chờ xong 5 giây");
}

/**
 * Bài 27: fetchWithRetry(url, retries) - thử gọi API tối đa "retries"
 * lần, nếu lần nào cũng lỗi thì mới ném lỗi ra ngoài.
 */
async function fetchWithRetry(url: string, retries: number): Promise<any> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP lỗi: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      lastError = err;
      console.log(
        `Bài 27 - Lần thử ${attempt}/${retries} thất bại: ${(err as Error).message}`
      );
    }
  }

  // Hết số lần thử mà vẫn lỗi -> ném lỗi cuối cùng ra ngoài
  throw lastError;
}

/**
 * Bài 28: batchProcess() - xử lý 5 tác vụ async CÙNG LÚC bằng
 * Promise.all().
 */
async function batchProcess(): Promise<void> {
  const tasks = [1, 2, 3, 4, 5].map((n) => simulateTask(n * 200));
  const results = await Promise.all(tasks);
  console.log("Bài 28 - Kết quả batch:", results);
}

/**
 * Bài 29: queueProcess() - xử lý các tác vụ TUẦN TỰ theo kiểu hàng
 * đợi (queue): tác vụ sau chỉ bắt đầu khi tác vụ trước đã xong.
 */
async function queueProcess(): Promise<void> {
  const times = [300, 500, 200];
  for (const t of times) {
    const result = await simulateTask(t);
    console.log("Bài 29 - Xử lý xong:", result);
  }
}

/**
 * Bài 30: Dùng async/await + Promise.allSettled() để gọi nhiều API
 * cùng lúc và hiển thị trạng thái thành công/thất bại của TỪNG cái.
 * Khác Promise.all(): allSettled() không bao giờ "reject sớm" - nó
 * luôn đợi tất cả xong rồi trả về mảng { status, value/reason }.
 */
async function demo30(): Promise<void> {
  const urls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://invalid-url-khong-ton-tai.xyz", // URL này sẽ luôn lỗi
  ];

  const results = await Promise.allSettled(
    urls.map((url) => fetch(url).then((r) => r.json()))
  );

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Bài 30 - URL ${i + 1}: THÀNH CÔNG -`, result.value);
    } else {
      console.log(`Bài 30 - URL ${i + 1}: THẤT BẠI -`, result.reason?.message ?? result.reason);
    }
  });
}

/* =============================================================
 *  DEMO TỪNG BÀI - CHẠY RIÊNG LẺ, KHÔNG CHẠY CHUNG
 * =============================================================
 * Mỗi bài có 1 hàm demoN() riêng, in kết quả ra console. Ở cuối file
 * có 1 "bảng tra" (map) nối số bài -> hàm demo tương ứng, và code sẽ
 * đọc số bài bạn muốn chạy từ dòng lệnh để CHỈ chạy đúng 1 bài đó.
 *
 * CÁCH CHẠY (dùng ts-node):
 *   npx ts-node async_typescript_exercises.ts 5
 *   -> chỉ chạy demo của Bài 5, các bài khác không chạy.
 *
 * CÁCH CHẠY (biên dịch trước bằng tsc rồi chạy bằng node):
 *   npx tsc --target ES2020 --module commonjs --moduleResolution node --lib ES2020,DOM async_typescript_exercises.ts
 *   node async_typescript_exercises.js 5
 *
 * Số ở cuối lệnh (5, 11, 21...) chính là số thứ tự bài bạn muốn xem
 * kết quả. Đổi số đó để chạy bài khác.
 */

// ----- Các demo còn thiếu (những bài chưa có hàm demo riêng ở trên) -----

async function demo1(): Promise<void> {
  const message = await helloAsync();
  console.log("Bài 1 -", message);
}

async function demo2(): Promise<void> {
  const result = await getTen();
  console.log("Bài 2 -", result);
}

async function demo3(): Promise<void> {
  try {
    await willFail();
  } catch (err) {
    console.error("Bài 3 - Promise bị reject với lỗi:", (err as Error).message);
  }
}

async function demo5(): Promise<void> {
  const result = await simulateTask(1000);
  console.log("Bài 5 -", result);
}

async function demo9(): Promise<void> {
  const evens = await readArrayAndFilterEven();
  console.log("Bài 9 - Các số chẵn:", evens);
}

async function demo14(): Promise<void> {
  const result = await tripleAfterDelay(5);
  console.log("Bài 14 - 5 x 3 =", result);
}

async function demo18(): Promise<void> {
  const user = await fetchUser(1);
  console.log("Bài 18 -", user);
}

async function demo19(): Promise<void> {
  const users = await fetchUsers([1, 2, 3]);
  console.log("Bài 19 -", users);
}

async function demo20(): Promise<void> {
  try {
    // Cố tình đặt timeout rất ngắn (100ms) để chắc chắn thấy lỗi timeout
    const user = await fetchUserWithTimeout(1, 100);
    console.log("Bài 20 -", user);
  } catch (err) {
    console.log("Bài 20 - Lỗi timeout như mong đợi:", (err as Error).message);
  }
}

async function demo23(): Promise<void> {
  const todos = await fetchIncompleteTodos();
  console.log("Bài 23 - Số todo chưa hoàn thành:", todos.length);
  console.log(todos.slice(0, 5)); // in thử 5 cái đầu cho gọn
}

async function demo24(): Promise<void> {
  const result = await postData();
  console.log("Bài 24 -", result);
}

async function demo25(): Promise<void> {
  await downloadFile();
}

async function demo27(): Promise<void> {
  const data = await fetchWithRetry(
    "https://jsonplaceholder.typicode.com/todos/1",
    3
  );
  console.log("Bài 27 -", data);
}

async function demo28(): Promise<void> {
  await batchProcess();
}

async function demo29(): Promise<void> {
  await queueProcess();
}

// ----- Bảng tra: số bài -> hàm demo -----
const demos: Record<number, () => Promise<void>> = {
  1: demo1,
  2: demo2,
  3: demo3,
  4: async () => demo4(),
  5: demo5,
  6: async () => demo6(),
  7: async () => demo7(),
  8: async () => demo8(),
  9: demo9,
  10: async () => demo10(),
  11: demo11,
  12: demo12,
  13: demo13,
  14: demo14,
  15: demo15,
  16: demo16,
  17: demo17,
  18: demo18,
  19: demo19,
  20: demo20,
  21: demo21,
  22: demo22,
  23: demo23,
  24: demo24,
  25: demo25,
  26: demo26,
  27: demo27,
  28: demo28,
  29: demo29,
  30: demo30,
};

// ----- Đọc số bài từ dòng lệnh và chỉ chạy đúng bài đó -----
async function main(): Promise<void> {
  // process.argv[0] = đường dẫn node, [1] = đường dẫn file, [2] = tham số đầu tiên
  const arg = process.argv[2];
  const exerciseNumber = Number(arg);

  if (!arg || Number.isNaN(exerciseNumber) || !demos[exerciseNumber]) {
    console.log("Vui lòng chạy kèm số thứ tự bài (1-30). Ví dụ:");
    console.log("  npx ts-node async_typescript_exercises.ts 5");
    return;
  }

  console.log(`===== Bài ${exerciseNumber} =====`);
  await demos[exerciseNumber]();
}

main();