const axios = require ('axios');

//1

async function fetchUrls(url) {
    const results = [];
    for (const url of urls) {
        const res = await axios.get(url);
        results.push(res);
    }
    return results;
}
/**
 * Sử dụng vòng lặp for...of để lặp qua từng URL một lần và thực hiện các yêu cầu axios tuần tự.
 * Có thêm một khối try...catch để xử lý lỗi cho mỗi yêu cầu. Nếu có lỗi, nó sẽ log lỗi và push null vào mảng kết quả.
 * 
*/



//2 
async function fetchUrlsParallel(urls) {
    const results = await Promise.all(
        urls.map(function(url){
            return axios.get(url);
        })
    );
    return results;
}
/**
 * Sử dụng Promise.all để thực hiện đồng thời nhiều yêu cầu. Các yêu cầu được thực hiện song song, không chờ đợi một cái xong mới thực hiện cái kia.
 * Sử dụng urls.map để tạo ra một mảng các promise, và sau đó truyền mảng này vào Promise.all.
 * Có một khối try...catch để xử lý lỗi toàn bộ quá trình thực hiện. Nếu có bất kỳ lỗi nào xảy ra, nó sẽ log lỗi và trả về một mảng rỗng.
 */

// So sánh:

// Đoạn code 2 (fetchUrlsParallel) có thể nhanh hơn nếu có nhiều yêu cầu cần thực hiện đồng thời, vì chúng được thực hiện song song.
// Đoạn code 1 (fetchUrls) thích hợp hơn khi bạn muốn kiểm soát thứ tự của các yêu cầu và xử lý lỗi từng yêu cầu một cách độc lập.