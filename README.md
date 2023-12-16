# remove-duplicates

## Общие сведения

**Задача:** Удалить дубликаты из массива объектов. Объекты имеют два поля - `id: number, type: string` - `primary keys`

**Данные для тестирования:** Процесс подготовки датасета пожно посмотреть в файле `data.js`. Для рандомной генерации используется ключ, чтобы значения оставились неизменными между запусками.

- Размер: 50000
- Количество дубликатов: 3871 (7.742%)

**Используемая платформа для запуска:** Bun  
*TODO:* Стоит переписать код на использование `require`, чтобы протестировать метрики в node.js

## Участники исследования

- `filterByDeletingFromIdsSet` - фильтрация дубликатов за счет того, функция фильтрации будет возвращать `true` лишь на первый встреченный дубликат

```js
const filterByDeletingFromIdsSet = (monitorMemory = false) => {
    const ids = new Set(arr.map((el) => el.id + el.type));
    return arr.filter((el) => ids.delete(el.id + el.type)).length;
};
```

- `toMapToValues` - запись всех элементов в map по ключу `id + type`

```js
const toMapToValues = () => {
    const map = {};
    arr.forEach((el) => (map[el.id + el.type] = el));
    return Object.values(map).length;
};
```

- `toMapToValues2` - отличается от `toMapToValues` выполнением проверки, есть ли уже элемент с таким ключом

```js
const toMapToValues2 = () => {
    const map = {};
    arr.forEach((el) => !map[el.id + el.type] && (map[el.id + el.type] = el));
    return Object.values(map).length;
};
```

- `toMapToValues3` - отличается от `toMapToValues2` тем, что `id + type` выносится в отдельную переменную, т.к. ее нужно использовать дважды

```js
const toMapToValues3 = () => {
    const map = {};
    arr.forEach((el) => {
        const idtype = el.id + el.type;
        if (!map[idtype]) map[idtype] = el;
    });
    return Object.values(map).length;
};
```

- `reduceWithIndexCheck` - сборка массива без дубликатов путем проверки каждого на наличие

```js
const reduceWithIndexCheck = () =>
    arr.reduce(
        (acc, el) =>
            acc.findIndex((ell) => ell.id === el.id && ell.type === el.type) >
            -1
                ? acc
                : [...acc, el],
        []
    ).length;
```

- `reduceWithIndexCheck2` - отличается от `reduceWithIndexCheck` тем, что добавление нового элемента реализовано через `.concat()`

```js
const reduceWithIndexCheck2 = () =>
    arr.reduce(
        (acc, el) =>
            acc.findIndex((ell) => ell.id === el.id && ell.type === el.type) >
            -1
                ? acc
                : acc.concat(el),
        []
    ).length;
```

- `filterWithSetOfIds` - фильтрация массива с проверкой уникальных `id + type` через `Set`

```js
const filterWithSetOfIds = () => {
    const idtypes = new Set();
    return arr.filter((el) => {
        if (!idtypes.has(el.id + el.type)) {
            idtypes.add(el.id + el.type);
            return true;
        }
        return false;
    }).length;
};
```

- `filterWithMapOfIds` - фильтрация массива с проверкой уникальных `id + type` через `Map`

```js
const filterWithMapOfIds = () => {
    const idtypes = {};
    return arr.filter((el) => {
        if (!idtypes[el.id + el.type]) {
            idtypes[el.id + el.type] = true;
            return true;
        }
        return false;
    }).length;
};
```

- `toStringToSetToArrayToObject` - `stringify -> Set -> Array -> parse`

```js
const toStringToSetToArrayToObject = () => {
    return Array.from(
        new Set(arr.map((el) => JSON.stringify(el)))
    ).map((el) => JSON.parse(el));
};
```

- `reduceWithSetOfIds` - сборка нового массива с проверкой уникальных `id + type` через `Set`

```js
const reduceWithSetOfIds = () => {
    const idtypes = new Set();
    return arr.reduce((acc, el) => {
        if (idtypes.has(el.id + el.type)) return acc;
        idtypes.add(el.id + el.type);
        return acc.concat(el);
    }, []).length;
};
```

## Результаты

- Для снижения влияния других запущенных процессов указаны усредненные результаты по нескольким запускам
- Память указана за 1 запуск

| | Алгоритм | Количество запусков | Время (мс) | Память (мб) |
|---|---|---|---|---|
| ![.](https://placehold.co/12x12/FFF176/FFF176) | filterByDeletingFromIdsSet | 100 | `21.612` | 17.83 |
| ![.](https://placehold.co/12x12/81C784/81C784) | toMapToValues | 100 | `13.987` | 8.53 |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | toMapToValues2 | 100 | `19.78` | 11.11 |
| ![.](https://placehold.co/12x12/81C784/81C784) | toMapToValues3 | 100 | `14.735` | 8.83 |
| ![.](https://placehold.co/12x12/E57373/E57373) | reduceWithIndexCheck | 20 | `3827.756` | 167.78 |
| ![.](https://placehold.co/12x12/E57373/E57373) | reduceWithIndexCheck2 | 20 | `2324.133` | 147.36 |
| ![.](https://placehold.co/12x12/81C784/81C784) | filterWithSetOfIds | 100 | `15.814` | 14.81 |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | filterWithMapOfIds | 100 | `18.726` | 11.53 |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | toStringToSetToArrayToObject | 100 | `16.507` | 17.48 |
| ![.](https://placehold.co/12x12/E57373/E57373) | reduceWithSetOfIds | 100 | `679.194` | 148.95 |
