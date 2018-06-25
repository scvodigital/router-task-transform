/* tslint:disable:no-any */
import DataTransform = require('node-json-transform');
import {RouterTask, RouteMatch, Helpers, RouteTaskError, RouteTaskConfiguration} from '@scvo/router';

export class TransformRouterTask extends RouterTask {
  name = 'transform';

  constructor() { super(); }

  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<any> {
    const transformer = DataTransform.DataTransform(routeMatch, task.config);
    const data = transformer.transform();
    return data;
  }
}
/* tslint:enable:no-any */
