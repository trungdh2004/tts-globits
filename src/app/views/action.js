export const handleGetAll = async (action, pageSize) => {
  try {
    let list = [];
    const { data } = await action({
      pageIndex: 1,
      pageSize: pageSize,
    });
    list = list.concat(data.content);
    if (data.totalPages > 1) {
      for (let i = 2; i <= data.totalPages; i++) {
        const { data } = await action({
          pageIndex: i,
          pageSize: 20,
        });
        list = list.concat(data.content);
      }
    }

    return list;
  } catch (error) {
    return [];
  }
};
