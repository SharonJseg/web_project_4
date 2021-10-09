export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    Promise.resolve(this._renderedItems).then((data) => {
      data.forEach((item) => this._renderer(item));
    });
    // console.log(this._renderedItems);
    // console.log(this._renderedItems);
    // this._renderedItems.forEach((item) => this._renderer(item));
  }

  setItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
