import messages from "./user_messages.json"
import './StringExtensions';
import { IPipeline } from "./IPipeline.js";
import { Branch } from "./branch.js";


export class CommentContentFactory {
   
    public createIterationHeader(buildIteration: string): string{
        return messages.newIterationCommentHeading.format(buildIteration);
    }

    public createTableHeader(isFailure: boolean, targetBranchName: string, percentile: string): string {
        if (isFailure) {
            return messages.failureCommentTableHeading.format(targetBranchName, targetBranchName);
        }
        return messages.longRunningValidationCommentTableHeading.format(percentile, targetBranchName, targetBranchName);
    }

    public createTableSection(current: IPipeline, mostRecent: IPipeline, target: Branch, type: string, longRunningValidations: Map<string, number>, thresholdTimes: Map<string, number>): string {
        if (current.isFailure()){
            if (mostRecent.isFailure()) {
            return messages.failureCommentRow.format(current.getDisplayName(), current.getLink(), String(target.getPipelineFailStreak()), target.getTruncatedName(), type, target.getTruncatedName(), mostRecent.getDisplayName(), mostRecent.getLink());
        }
        return messages.successCommentRow.format(current.getDisplayName(), current.getLink(), target.getTruncatedName(), type);
    }
    //  TODO
    }
}
