import { Abi, useReadContract } from "@starknet-react/core";
import { BlockNumber } from "starknet";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
import {
  ContractName,
  UseScaffoldReadConfig,
} from "~~/utils/scaffold-stark/contract";

export const useScaffoldReadContract = <
  TAbi extends Abi,
  TContractName extends ContractName,
  TFunctionName extends string,
>({
  contractName,
  functionName,
  args,
  ...readConfig
}: UseScaffoldReadConfig<TAbi, TContractName, TFunctionName>) => {
  const { data: deployedContract } = useDeployedContractInfo(contractName);

  return useReadContract({
    functionName,
    address: deployedContract?.address,
    abi: deployedContract?.abi as any,
    watch: true,
    args: args || [],
    enabled:
      args && (!Array.isArray(args) || !args.some((arg) => arg === undefined)),
    blockIdentifier: "pending" as BlockNumber,
    ...(readConfig as any),
  }) as Omit<ReturnType<typeof useReadContract>, "data"> & {
    data: any | undefined;
  };
};
