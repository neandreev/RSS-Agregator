# RSS-Agregator

[![Eslint](https://github.com/neandreev/RSS-Agregator/actions/workflows/jest.yml/badge.svg?branch=main)](https://github.com/neandreev/RSS-Agregator/actions/workflows/jest.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/6aa59dd715928a165f0b/maintainability)](https://codeclimate.com/github/neandreev/RSS-Agregator/maintainability)

## Что это

Агрегатор RSS фидов, производящий парсинг RSS по приведённым вами ссылкам и выводящий в простой форме посты

## Демонстрация

<https://rss.neandreev.ru>

## Как это

- JS с минимумом библиотечных зависимостей
  - [lodash](https://github.com/lodash/lodash)
  - [Axios](https://github.com/axios/axios)
  - [on-change](https://github.com/sindresorhus/on-change) (удобная обёртка над [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), помогающая в реализации MVC подхода в приложении)
- Сборка: [Webpack](https://github.com/webpack/webpack)
- Стили: [Bootstrap](https://github.com/twbs/bootstrap)
- Интернационализация: [i18next](https://github.com/i18next/i18next)
- Валидация данных: [yup](https://github.com/jquense/yup)
- [Eslint](https://github.com/eslint/eslint)

## Как это работает

```sh
Установка: (внутри директории с исходным кодом)
   make install

Live-разработка:
   make develop

Сборка:
   make build (Результат будет находиться в папке 'public')
```

## Как это выглядит

<img src="https://neandreev.ru/images/RSS-Agregator_lowres.gif" alt="RSS-Agregator" width="600"/>
