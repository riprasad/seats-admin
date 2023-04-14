import {DependencyErrorResponse} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createDependencyErrorResponseFromDiscriminatorValue(parseNode: ParseNode | undefined) : DependencyErrorResponse {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new DependencyErrorResponse();
}
