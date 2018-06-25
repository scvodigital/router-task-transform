/* tslint:disable:no-any */
import DataTransform = require('node-json-transform');
import {RouterTask, RouteMatch, Helpers, RouteTaskError, RouteTaskConfiguration} from '@scvo/router';

export class TransformRouterTask extends RouterTask {
  name = 'transform';

  constructor() {
    super();
  }

  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<any> {
    let data = JSON.parse(JSON.stringify(routeMatch));
    const maps = Array.isArray(task.config) ? task.config : [task.config];

    for (let i = 0; i < maps.length; ++i) {
      const map = maps[i];
      const transformer = DataTransform.DataTransform(data, map);
      data = transformer.transform();
    }

    return data;
  }
}
/* tslint:enable:no-any */
