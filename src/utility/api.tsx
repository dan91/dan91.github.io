import { useList } from "@refinedev/core";
import { IGroup, ITrial } from "../interfaces";
import { GROUP_COLLECTION, TRIAL_COLLECTION } from "./appwriteClient";

export const useGetTrialsByExperimentId = (experimentId: string): ITrial[] => {
    const { data: groupsData } = useList<IGroup>({ resource: GROUP_COLLECTION, filters: [{ field: 'experimentId', operator: 'eq', value: experimentId }] });
    const groups = groupsData?.data ?? []
    const groupIds = groups.map((g) => g.id)

    const { data: trialsData } = useList<ITrial>({
        resource: TRIAL_COLLECTION, pagination: { pageSize: 20000 }
    });
    const trials = trialsData?.data.filter((t) => groupIds.includes(t.groupId)) ?? []

    return trials;
}