import {Container, inject, injectable} from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import 'reflect-metadata';

let gLazyInject: any;

interface IocModule {
  Configure(ioc: Container): void;
}

export {
  IocModule,
  Container,
  inject as Inject,
  injectable as Injectable,
};

export function InjectLazy(id: any) {
  return gLazyInject(id);
}

// tslint:disable-next-line:only-arrow-functions
(function () {
  const ioc = new Container();
  const {lazyInject} = getDecorators(ioc);
  gLazyInject = lazyInject;

  const m = require('./App.module');
  new m.AppModule().Configure(ioc);
})();
