import {DependencyErrorResponse_error} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createDependencyErrorResponse_errorFromDiscriminatorValue(parseNode: ParseNode | undefined) : DependencyErrorResponse_error {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new DependencyErrorResponse_error();
}
