import {PaginationLinks} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createPaginationLinksFromDiscriminatorValue(parseNode: ParseNode | undefined) : PaginationLinks {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new PaginationLinks();
}
