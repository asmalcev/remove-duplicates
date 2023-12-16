# remove-duplicates

## Общие сведения

**Задача:** Удалить дубликаты из массива объектов. Объекты имеют два поля - `id: number, type: string` - `primary keys`

**Данные для тестирования:** Процесс подготовки датасета пожно посмотреть в файле `data.js`. Для рандомной генерации используется ключ, чтобы значения оставились неизменными между запусками.

- Размер: 50000
- Количество дубликатов: 3871 (7.742%)

**Используемая платформа для запуска:** Bun  
*TODO:* Стоит переписать код на использование `require`, чтобы протестировать метрики в node.js

## Исследуемые алгоритмы

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

- `pushesUniqueInArrayWithIdsSet` - отличается `filterWithSetOfIds` тем, что собирает новый массив, а не фильтрует старый

```js
const pushesUniqueInArrayWithIdsSet = () => {
    const idtypes = new Set();
    const noDuplicates = [];
    arr.forEach((el) => {
        if (!idtypes.has(el.id + el.type)) {
            idtypes.add(el.id + el.type);
            noDuplicates.push(el);
        }
    });
    return noDuplicates.length;
};
```

- `collectUniqueInSetWithIdsSet` - отличается `pushesUniqueInArrayWithIdsSet` тем, что собирает элементы в множество

```js
const collectUniqueInSetWithIdsSet = () => {
    const idtypes = new Set();
    const noDuplicates = new Set();
    arr.forEach((el) => {
        if (!idtypes.has(el.id + el.type)) {
            idtypes.add(el.id + el.type);
            noDuplicates.add(el);
        }
    });
    return Array.from(noDuplicates).length;
};
```

- `forOfWithIdsMap` - цикл по массиву, в котором уникальные значения добавляются в результат, с использованием `Map`

```js
const forOfWithIdsMap = () => {
    const idtypes = {};
    const out = [];
    let j = 0;
    for (const el of arr) {
        const idtype = el.id + el.type;
        if (idtypes[idtype] !== 1) {
            idtypes[idtype] = 1;
            out[j++] = el;
        }
    }
    return out.length;
};
```

- `forOfWithIdsSet` - то же самое, что и `forOfWithIdsMap`, но с `Set` вместо `Map`

```js
const forOfWithIdsSet = () => {
    const idtypes = new Set();
    const out = [];
    let j = 0;
    for (const el of arr) {
        const idtype = el.id + el.type;
        if (!idtypes.has(idtype)) {
            idtypes.add(idtype);
            out[j++] = el;
        }
    }
    return out.length;
};
```

## Результаты

- Для снижения влияния других запущенных процессов указаны усредненные результаты по нескольким запускам
- Память указана за 1 запуск

| | Алгоритм | Количество запусков | Время (мс) | Память (мб) |
|---|---|---|---|---|
| ![.](https://placehold.co/12x12/FFF176/FFF176) | filterByDeletingFromIdsSet | 100 | `20.683` | `17.83` |
| ![.](https://placehold.co/12x12/81C784/81C784) | toMapToValues | 100 | `13.101` | `8.53` |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | toMapToValues2 | 100 | `18.492` | `11.11` |
| ![.](https://placehold.co/12x12/81C784/81C784) | toMapToValues3 | 100 | `14.548` | `8.83` |
| ![.](https://placehold.co/12x12/E57373/E57373) | reduceWithIndexCheck | 20 | `3827.756` | `167.78` |
| ![.](https://placehold.co/12x12/E57373/E57373) | reduceWithIndexCheck2 | 20 | `2324.133` | `147.36` |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | filterWithSetOfIds | 100 | `16.224` | `14.81` |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | filterWithMapOfIds | 100 | `17.858` | `11.53` |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | toStringToSetToArrayToObject | 100 | `16.722` | `17.48` |
| ![.](https://placehold.co/12x12/E57373/E57373) | reduceWithSetOfIds | 100 | `712.121` | `148.95` |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | pushesUniqueInArrayWithIdsSet | 100 | `16.369` | `14.97` |
| ![.](https://placehold.co/12x12/FFF176/FFF176) | collectUniqueInSetWithIdsSet | 100 | `19.366` | `17.13` |
| ![.](https://placehold.co/12x12/81C784/81C784) | forOfWithIdsMap | 100 | `14.706` | `9.53` |
| ![.](https://placehold.co/12x12/81C784/81C784) | forOfWithIdsSet | 100 | `13.272` | `10.88` |

**1\. Место:** `toMapToValues`  
**2\. Место:** `forOfWithIdsSet`  
**3\. Место:** `toMapToValues3`  
**4\. Место:** `forOfWithIdsMap`  

## Выводы

- `reduce` ужасно долгий и тратит много памяти
- `stringify-parse` показал себя неожиданно хорошо, но качество явно ухудшится на реальных данных, где будут и другие поля в объектах
