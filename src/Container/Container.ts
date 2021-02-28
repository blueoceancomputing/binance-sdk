import 'reflect-metadata'
import { Container, ContainerModule } from 'inversify'

const bindings = new ContainerModule((bind) => {
  require('./Bindings')(bind)
});

const eventBindings = new ContainerModule((bind) => {
  require('./EventBindings')(bind)
});

const requestBindings = new ContainerModule((bind) => {
  require('./RequestBindings')(bind)
});

const transformerBindings = new ContainerModule((bind) => {
  require('./TransformerBindings')(bind)
});

const container = new Container();

container.load(bindings, eventBindings, requestBindings, transformerBindings);

export default container;