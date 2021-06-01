export function sortData(data, key, dataType, ascending) {
  if (!data || data.length === 0) return data;
  // Made change to strip out null fields to stop them messing up the sort
  const nullFields = data.filter((d) => !d[key] && d[key] !== 0);
  const nonNullFields = data.filter((d) => !!d[key] || d[key] === 0);
  switch (dataType) {
    case 'string':
    case 'date':
    case 'datetime':
      if (ascending) {
        nonNullFields.sort((a, b) => a[key].localeCompare(b[key]));
      } else {
        nonNullFields.sort((a, b) => b[key].localeCompare(a[key]));
      }
      break;
    case 'number':
      nonNullFields.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        return ascending ? x - y : y - x;
      });
      break;
    case 'boolean':
      if (ascending) {
        return [...nonNullFields, ...nullFields];
      }
      return [...nullFields, ...nonNullFields];
    default:
      return data;
  }
  // always include null fields at the end of the array
  return [...nonNullFields, ...nullFields];
}

export function sortedArray(array, sortableValue, numericSort) {
  if (!array || array.length === 0) return [];
  const newArray = [...array];
  if (numericSort && sortableValue) {
    newArray.sort((a, b) => {
      const x = a[sortableValue];
      const y = b[sortableValue];
      return x - y;
    });
  } else {
    newArray.sort((a, b) => {
      const sortA =
        sortableValue && a[sortableValue] ? a[sortableValue].toString() : a;
      const sortB =
        sortableValue && b[sortableValue] ? b[sortableValue].toString() : b;
      if (typeof sortA !== 'string' || typeof sortB !== 'string') {
        return 0;
      }
      return (
        // eslint-disable-line no-nested-ternary
        sortA.toLowerCase() < sortB.toLowerCase()
          ? -1
          : sortB.toLowerCase() < sortA.toLowerCase()
          ? 1
          : 0
      );
    });
  }
  return newArray;
}

export function listToTree(l, sort) {
  if (!l) return null;
  const list = [...l];
  const m = {};
  let node;
  let base = [];
  let i;

  for (i = 0; i < list.length; i += 1) {
    m[list[i].id] = i; // initialize the m
    list[i].childElements = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentID !== '0') {
      if (m[node.parentID] !== null && list[m[node.parentID]]) {
        list[m[node.parentID]].childElements.push(node);
        if (sort) {
          list[m[node.parentID]].childElements = sortedArray(
            list[m[node.parentID]].childElements,
            'sortOrder',
            true
          );
        }
      }
    } else {
      base.push(node);
      if (sort) base = sortedArray(base, 'sortOrder', true);
    }
  }
  return base;
}