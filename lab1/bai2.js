const Nguoi = (ten, tuoi) => {
    return{
    ten,
    tuoi,
    chao() {
        console.log(`Xin chào ${ten}. Bạn ${tuoi}(tuổi)`);
    }
};
};

const Nguoi1 = Nguoi("Hắc Hoàng", 30);
const Nguoi2 = Nguoi("Đoạn Đức", 27);

Nguoi1.chao();
Nguoi2.chao();