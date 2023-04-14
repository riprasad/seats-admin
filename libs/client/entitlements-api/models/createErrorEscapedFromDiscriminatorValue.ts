import {ErrorEscaped} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createErrorEscapedFromDiscriminatorValue(parseNode: ParseNode | undefined) : ErrorEscaped {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new ErrorEscaped();
}
