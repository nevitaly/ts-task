import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items];
    }

    totalPrice(): number {
        return this._items.reduce((sum: number, item: Buyable): number => sum + item.price, 0);
    }

    totalPriceWithDiscount(discount: number): number {
        return this.totalPrice() * (1 - discount / 100);
    }

    removeById(id: number): void {
        this._items = this._items.filter((item: Buyable): boolean => item.id !== id);
    }
}