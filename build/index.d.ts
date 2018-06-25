import { RouterTask, RouteMatch, RouteTaskConfiguration } from '@scvo/router';
export declare class TransformRouterTask extends RouterTask {
    name: string;
    constructor();
    execute(routeMatch: RouteMatch, task: RouteTaskConfiguration): Promise<any>;
}
