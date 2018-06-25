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
    let cache: string[] = [];
    let data = JSON.parse(JSON.stringify(routeMatch, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Duplicate reference found
          try {
            // If this value does not reference a parent it can be deduped
            return JSON.parse(JSON.stringify(value));
          } catch (error) {
            // discard key if value cannot be deduped
            return;
          }
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    }));
    cache = [];
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
