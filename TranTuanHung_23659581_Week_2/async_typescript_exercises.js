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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _this = this;
/* =============================================================
 * PHẦN A: PROMISE CƠ BẢN
 * =============================================================
 */
/**
 * Bài 1: Tạo 1 Promise trả về chuỗi "Hello Async" sau 2 giây.
 * new Promise((resolve, reject) => {...}) là cách tạo Promise thủ công.
 * Bên trong, ta gọi resolve(value) khi thành công, reject(error) khi lỗi.
 */
function helloAsync() {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve("Hello Async"); }, 2000);
    });
}
/**
 * Bài 2: Hàm trả về Promise, resolve số 10 sau 1 giây.
 */
function getTen() {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve(10); }, 1000);
    });
}
/**
 * Bài 3: Hàm trả về Promise bị reject (lỗi) sau 1 giây.
 * Promise<never> nghĩa là Promise này không bao giờ resolve thành công,
 * chỉ có thể reject.
 */
function willFail() {
    return new Promise(function (_resolve, reject) {
        setTimeout(function () { return reject(new Error("Something went wrong")); }, 1000);
    });
}
/**
 * Bài 4: Dùng .then() / .catch() để xử lý Promise trả về số ngẫu nhiên.
 */
function getRandomNumber() {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve(Math.floor(Math.random() * 100)); }, 500);
    });
}
function demo4() {
    getRandomNumber()
        .then(function (num) { return console.log("Bài 4 - Số ngẫu nhiên:", num); })
        .catch(function (err) { return console.error("Bài 4 - Lỗi:", err); });
}
/**
 * Bài 5: simulateTask(time) - trả về Promise resolve "Task done" sau
 * "time" mili-giây. Đây là hàm mô phỏng 1 tác vụ bất kỳ tốn thời gian
 * (sẽ được dùng lại ở rất nhiều bài phía sau).
 */
function simulateTask(time) {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve("Task done"); }, time);
    });
}
/**
 * Bài 6: Promise.all() - chạy song song nhiều Promise, chỉ hoàn thành
 * khi TẤT CẢ đều resolve (nếu 1 cái reject thì Promise.all cũng reject
 * ngay lập tức).
 */
function demo6() {
    Promise.all([simulateTask(1000), simulateTask(500), simulateTask(1500)]).then(function (results) {
        // results là mảng kết quả, đúng theo thứ tự truyền vào (không
        // phải theo thứ tự hoàn thành trước/sau)
        console.log("Bài 6 - Promise.all:", results);
    });
}
/**
 * Bài 7: Promise.race() - trả về Promise nào HOÀN THÀNH TRƯỚC (dù
 * thành công hay thất bại), các Promise còn lại vẫn chạy ngầm nhưng
 * kết quả của chúng bị bỏ qua.
 */
function demo7() {
    Promise.race([simulateTask(2000), simulateTask(300)]).then(function (result) {
        console.log("Bài 7 - Promise nhanh nhất:", result);
    });
}
/**
 * Bài 8: Chuỗi Promise (Promise chaining) - bình phương 2, nhân đôi,
 * cộng 5. Mỗi .then() nhận kết quả của bước trước và trả về Promise
 * mới cho bước sau.
 */
function square(n) {
    return new Promise(function (resolve) { return resolve(n * n); });
}
function double(n) {
    return new Promise(function (resolve) { return resolve(n * 2); });
}
function addFive(n) {
    return new Promise(function (resolve) { return resolve(n + 5); });
}
function demo8() {
    // 2 -> bình phương = 4 -> nhân đôi = 8 -> cộng 5 = 13
    square(2)
        .then(function (result) { return double(result); })
        .then(function (result) { return addFive(result); })
        .then(function (finalResult) { return console.log("Bài 8 - Kết quả chuỗi:", finalResult); });
}
/**
 * Bài 9: Promise đọc 1 mảng sau 1 giây rồi lọc ra các số chẵn.
 */
function readArrayAndFilterEven() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            resolve(arr.filter(function (n) { return n % 2 === 0; }));
        }, 1000);
    });
}
/**
 * Bài 10: Dùng .finally() để log "Done" khi Promise kết thúc, dù
 * thành công hay thất bại. .finally() luôn chạy sau .then()/.catch().
 */
function demo10() {
    simulateTask(800)
        .then(function (result) { return console.log("Bài 10 - Kết quả:", result); })
        .catch(function (err) { return console.error("Bài 10 - Lỗi:", err); })
        .finally(function () { return console.log("Bài 10 - Done"); });
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
function demo11() {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helloAsync()];
                case 1:
                    message = _a.sent();
                    console.log("Bài 11 -", message);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 12: Hàm async gọi simulateTask(2000) rồi log kết quả.
 */
function demo12() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, simulateTask(2000)];
                case 1:
                    result = _a.sent();
                    console.log("Bài 12 -", result);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 13: Xử lý lỗi bằng try/catch với async/await - cách viết này
 * tương đương .catch() nhưng đọc tự nhiên hơn (giống code đồng bộ).
 */
function demo13() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, willFail()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Bài 13 - Bắt được lỗi:", err_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 14: Hàm async nhận 1 số, chờ 1 giây, rồi trả về số đó nhân 3.
 */
function tripleAfterDelay(num) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, num * 3];
            }
        });
    });
}
/**
 * Bài 15: Gọi nhiều hàm async TUẦN TỰ (sequential) bằng await - mỗi
 * lệnh await phải chờ xong mới chạy tới lệnh await tiếp theo, nên
 * tổng thời gian = tổng thời gian của từng tác vụ cộng lại.
 */
function demo15() {
    return __awaiter(this, void 0, void 0, function () {
        var r1, r2, r3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, simulateTask(500)];
                case 1:
                    r1 = _a.sent();
                    return [4 /*yield*/, simulateTask(500)];
                case 2:
                    r2 = _a.sent();
                    return [4 /*yield*/, simulateTask(500)];
                case 3:
                    r3 = _a.sent();
                    console.log("Bài 15 - Tuần tự:", r1, r2, r3);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 16: Gọi nhiều hàm async SONG SONG (parallel) bằng Promise.all().
 * Khác bài 15: các Promise được TẠO trước (bắt đầu chạy ngay), rồi mới
 * await Promise.all - nên tổng thời gian = thời gian tác vụ LÂU NHẤT,
 * không phải tổng cộng.
 */
function demo16() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, r1, r2, r3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        simulateTask(500),
                        simulateTask(700),
                        simulateTask(300),
                    ])];
                case 1:
                    _a = _b.sent(), r1 = _a[0], r2 = _a[1], r3 = _a[2];
                    console.log("Bài 16 - Song song:", r1, r2, r3);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 17: Dùng "for await...of" để duyệt qua 1 mảng các Promise, in
 * kết quả của từng Promise ngay khi nó resolve (theo đúng thứ tự
 * trong mảng, không phải thứ tự hoàn thành trước/sau).
 */
function demo17() {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, _a, tasks_1, tasks_1_1, result, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    tasks = [simulateTask(300), simulateTask(600), simulateTask(100)];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _a = true, tasks_1 = __asyncValues(tasks);
                    _e.label = 2;
                case 2: return [4 /*yield*/, tasks_1.next()];
                case 3:
                    if (!(tasks_1_1 = _e.sent(), _b = tasks_1_1.done, !_b)) return [3 /*break*/, 5];
                    _d = tasks_1_1.value;
                    _a = false;
                    result = _d;
                    console.log("Bài 17 - Hoàn thành:", result);
                    _e.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_a && !_b && (_c = tasks_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(tasks_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function fetchUser(id) {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve({ id: id, name: "User ".concat(id) }); }, 1000);
    });
}
/**
 * Bài 19: fetchUsers(ids) - gọi fetchUser cho từng id, chạy song song
 * bằng Promise.all() kết hợp với .map().
 */
function fetchUsers(ids) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(ids.map(function (id) { return fetchUser(id); }))];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, users];
            }
        });
    });
}
/**
 * Bài 20: Thêm timeout cho lệnh gọi API - nếu quá 2 giây thì ném lỗi.
 * Kỹ thuật: dùng Promise.race() giữa Promise thật (fetchUser) và 1
 * Promise "đồng hồ đếm ngược" sẽ reject nếu tới hạn mà chưa xong.
 */
function fetchUserWithTimeout(id, timeoutMs) {
    if (timeoutMs === void 0) { timeoutMs = 2000; }
    var timeoutPromise = new Promise(function (_resolve, reject) {
        setTimeout(function () { return reject(new Error("Timeout: API call quá 2 giây")); }, timeoutMs);
    });
    return Promise.race([fetchUser(id), timeoutPromise]);
}
/* =============================================================
 * PHẦN C: FETCH API & I/O GIẢ LẬP
 * (Các bài 21-24, 30 cần kết nối Internet để chạy)
 * =============================================================
 */
/**
 * Bài 21: Dùng fetch để lấy dữ liệu từ API công khai.
 * fetch() trả về Promise<Response>; gọi .json() để lấy dữ liệu dạng
 * JSON (cũng trả về 1 Promise nên phải await thêm lần nữa).
 */
function demo21() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/todos/1")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log("Bài 21 -", data);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 22: Gọi API nhiều lần rồi log từng kết quả (ở đây gọi tuần tự
 * bằng vòng lặp + await; có thể đổi sang song song bằng Promise.all
 * như bài 16 nếu muốn nhanh hơn).
 */
function demo22() {
    return __awaiter(this, void 0, void 0, function () {
        var i, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 1;
                    _a.label = 1;
                case 1:
                    if (!(i <= 3)) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/todos/".concat(i))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log("B\u00E0i 22 - Todo ".concat(i, ":"), data);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function fetchIncompleteTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var response, todos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/todos")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    todos = _a.sent();
                    return [2 /*return*/, todos.filter(function (t) { return !t.completed; })];
            }
        });
    });
}
/**
 * Bài 24: postData() - gửi request POST tới API thử nghiệm.
 */
function postData() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/posts", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
/**
 * Bài 25: downloadFile - mô phỏng tải file mất 3 giây, log khi xong.
 */
function downloadFile() {
    return new Promise(function (resolve) {
        console.log("Bài 25 - Bắt đầu tải file...");
        setTimeout(function () {
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
function wait(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function demo26() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Bài 26 - Bắt đầu chờ 5 giây...");
                    return [4 /*yield*/, wait(5000)];
                case 1:
                    _a.sent();
                    console.log("Bài 26 - Đã chờ xong 5 giây");
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 27: fetchWithRetry(url, retries) - thử gọi API tối đa "retries"
 * lần, nếu lần nào cũng lỗi thì mới ném lỗi ra ngoài.
 */
function fetchWithRetry(url, retries) {
    return __awaiter(this, void 0, void 0, function () {
        var lastError, attempt, response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attempt = 1;
                    _a.label = 1;
                case 1:
                    if (!(attempt <= retries)) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch(url)];
                case 3:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP l\u1ED7i: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    err_2 = _a.sent();
                    lastError = err_2;
                    console.log("B\u00E0i 27 - L\u1EA7n th\u1EED ".concat(attempt, "/").concat(retries, " th\u1EA5t b\u1EA1i: ").concat(err_2.message));
                    return [3 /*break*/, 6];
                case 6:
                    attempt++;
                    return [3 /*break*/, 1];
                case 7: 
                // Hết số lần thử mà vẫn lỗi -> ném lỗi cuối cùng ra ngoài
                throw lastError;
            }
        });
    });
}
/**
 * Bài 28: batchProcess() - xử lý 5 tác vụ async CÙNG LÚC bằng
 * Promise.all().
 */
function batchProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var tasks, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tasks = [1, 2, 3, 4, 5].map(function (n) { return simulateTask(n * 200); });
                    return [4 /*yield*/, Promise.all(tasks)];
                case 1:
                    results = _a.sent();
                    console.log("Bài 28 - Kết quả batch:", results);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 29: queueProcess() - xử lý các tác vụ TUẦN TỰ theo kiểu hàng
 * đợi (queue): tác vụ sau chỉ bắt đầu khi tác vụ trước đã xong.
 */
function queueProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var times, _i, times_1, t, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    times = [300, 500, 200];
                    _i = 0, times_1 = times;
                    _a.label = 1;
                case 1:
                    if (!(_i < times_1.length)) return [3 /*break*/, 4];
                    t = times_1[_i];
                    return [4 /*yield*/, simulateTask(t)];
                case 2:
                    result = _a.sent();
                    console.log("Bài 29 - Xử lý xong:", result);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Bài 30: Dùng async/await + Promise.allSettled() để gọi nhiều API
 * cùng lúc và hiển thị trạng thái thành công/thất bại của TỪNG cái.
 * Khác Promise.all(): allSettled() không bao giờ "reject sớm" - nó
 * luôn đợi tất cả xong rồi trả về mảng { status, value/reason }.
 */
function demo30() {
    return __awaiter(this, void 0, void 0, function () {
        var urls, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urls = [
                        "https://jsonplaceholder.typicode.com/todos/1",
                        "https://jsonplaceholder.typicode.com/todos/2",
                        "https://invalid-url-khong-ton-tai.xyz", // URL này sẽ luôn lỗi
                    ];
                    return [4 /*yield*/, Promise.allSettled(urls.map(function (url) { return fetch(url).then(function (r) { return r.json(); }); }))];
                case 1:
                    results = _a.sent();
                    results.forEach(function (result, i) {
                        var _a, _b;
                        if (result.status === "fulfilled") {
                            console.log("B\u00E0i 30 - URL ".concat(i + 1, ": TH\u00C0NH C\u00D4NG -"), result.value);
                        }
                        else {
                            console.log("B\u00E0i 30 - URL ".concat(i + 1, ": TH\u1EA4T B\u1EA0I -"), (_b = (_a = result.reason) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : result.reason);
                        }
                    });
                    return [2 /*return*/];
            }
        });
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
function demo1() {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helloAsync()];
                case 1:
                    message = _a.sent();
                    console.log("Bài 1 -", message);
                    return [2 /*return*/];
            }
        });
    });
}
function demo2() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTen()];
                case 1:
                    result = _a.sent();
                    console.log("Bài 2 -", result);
                    return [2 /*return*/];
            }
        });
    });
}
function demo3() {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, willFail()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.error("Bài 3 - Promise bị reject với lỗi:", err_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function demo5() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, simulateTask(1000)];
                case 1:
                    result = _a.sent();
                    console.log("Bài 5 -", result);
                    return [2 /*return*/];
            }
        });
    });
}
function demo9() {
    return __awaiter(this, void 0, void 0, function () {
        var evens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readArrayAndFilterEven()];
                case 1:
                    evens = _a.sent();
                    console.log("Bài 9 - Các số chẵn:", evens);
                    return [2 /*return*/];
            }
        });
    });
}
function demo14() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tripleAfterDelay(5)];
                case 1:
                    result = _a.sent();
                    console.log("Bài 14 - 5 x 3 =", result);
                    return [2 /*return*/];
            }
        });
    });
}
function demo18() {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchUser(1)];
                case 1:
                    user = _a.sent();
                    console.log("Bài 18 -", user);
                    return [2 /*return*/];
            }
        });
    });
}
function demo19() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchUsers([1, 2, 3])];
                case 1:
                    users = _a.sent();
                    console.log("Bài 19 -", users);
                    return [2 /*return*/];
            }
        });
    });
}
function demo20() {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchUserWithTimeout(1, 100)];
                case 1:
                    user = _a.sent();
                    console.log("Bài 20 -", user);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    console.log("Bài 20 - Lỗi timeout như mong đợi:", err_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function demo23() {
    return __awaiter(this, void 0, void 0, function () {
        var todos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchIncompleteTodos()];
                case 1:
                    todos = _a.sent();
                    console.log("Bài 23 - Số todo chưa hoàn thành:", todos.length);
                    console.log(todos.slice(0, 5)); // in thử 5 cái đầu cho gọn
                    return [2 /*return*/];
            }
        });
    });
}
function demo24() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postData()];
                case 1:
                    result = _a.sent();
                    console.log("Bài 24 -", result);
                    return [2 /*return*/];
            }
        });
    });
}
function demo25() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, downloadFile()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function demo27() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3)];
                case 1:
                    data = _a.sent();
                    console.log("Bài 27 -", data);
                    return [2 /*return*/];
            }
        });
    });
}
function demo28() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchProcess()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function demo29() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, queueProcess()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// ----- Bảng tra: số bài -> hàm demo -----
var demos = {
    1: demo1,
    2: demo2,
    3: demo3,
    4: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, demo4()];
    }); }); },
    5: demo5,
    6: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, demo6()];
    }); }); },
    7: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, demo7()];
    }); }); },
    8: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, demo8()];
    }); }); },
    9: demo9,
    10: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, demo10()];
    }); }); },
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var arg, exerciseNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    arg = process.argv[2];
                    exerciseNumber = Number(arg);
                    if (!arg || Number.isNaN(exerciseNumber) || !demos[exerciseNumber]) {
                        console.log("Vui lòng chạy kèm số thứ tự bài (1-30). Ví dụ:");
                        console.log("  npx ts-node async_typescript_exercises.ts 5");
                        return [2 /*return*/];
                    }
                    console.log("===== B\u00E0i ".concat(exerciseNumber, " ====="));
                    return [4 /*yield*/, demos[exerciseNumber]()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
