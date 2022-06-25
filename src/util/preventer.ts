function preventer(map: Array<string>) {
  map.map((item) => {
    window.addEventListener(item, (e: Event) => {
      e.preventDefault();
    });
  });
}
