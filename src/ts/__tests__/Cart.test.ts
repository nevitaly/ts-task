import Cart from '../service/Cart';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Movie from '../domain/Movie';

const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);
const album = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);
const movie = new Movie(
    1009,
    'Мстители',
    'The Avengers',
    2012,
    'США',
    'Avengers Assemble!',
    ['фантастика', 'боевик', 'фэнтези', 'приключения'],
    137,
    500,
);

test('new card should be empty', () => {
    const cart = new Cart();

    expect(cart.items.length).toBe(0);
});

test('movie should be added to cart', () => {
    const cart = new Cart();
    cart.add(movie);

    expect(cart.items.length).toBe(1);
    expect(cart.items[0]).toBe(movie);
});

test('total price of empty cart should be 0', () => {
    const cart = new Cart();

    expect(cart.totalPrice()).toBe(0);
});

test('total price should sum all items', () => {
    const cart = new Cart();
    cart.add(book);
    cart.add(album);
    cart.add(movie);

    expect(cart.totalPrice()).toBe(3400);
});

test('total price with discount should apply percent', () => {
    const cart = new Cart();
    cart.add(book);
    cart.add(album);
    cart.add(movie);

    expect(cart.totalPriceWithDiscount(10)).toBe(3060);
});

test('zero discount should not change total price', () => {
    const cart = new Cart();
    cart.add(book);

    expect(cart.totalPriceWithDiscount(0)).toBe(2000);
});

test('removeById should delete item with given id', () => {
    const cart = new Cart();
    cart.add(book);
    cart.add(album);
    cart.removeById(1001);

    expect(cart.items).toEqual([album]);
});

test('removeById with unknown id should change nothing', () => {
    const cart = new Cart();
    cart.add(book);
    cart.removeById(555);

    expect(cart.items.length).toBe(1);
});