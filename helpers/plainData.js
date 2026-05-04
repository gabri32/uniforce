const toPlain = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => item.get({ plain: true }));
  }
  return data.get({ plain: true });
};

export{
    toPlain
}