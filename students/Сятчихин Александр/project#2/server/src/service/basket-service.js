function findItem(arr, id) { return arr.find(el => el.productId == id); };

module.exports = {
    add(basket, item) {
        basket.content.push(item);
        return basket;
    },
    change(basket, id, amount) {
        let find = findItem(basket.content, id);
        find.amount += amount;
        return basket;
    },
    delete(basket, id) {
        let find = findItem(basket.content, id);
        basket.content.splice(basket.content.indexOf(find), 1);
        return basket;
    }
}
