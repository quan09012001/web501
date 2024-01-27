class nguoi {
    constructor() {
        this.ho = 'Nguyễn';
        this.ten = 'Quân';
    }
    get hoTen() {
        return `${this.ho} ${this.ten}`;
    }
    chao() {
        console.log(`Chào! ${this.hoTen}`);
    }
}

const goiNguoi = new nguoi();
goiNguoi.chao(); // output: Chào! Nguyễn Quân