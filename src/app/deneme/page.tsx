"use client";
import { CampaignGoal } from "@/components/campaigns/goal";
import {
  togglePause,
  useIsPaused,
  addTier,
  removeTier,
  extendDeadline,
  fund,
  refund,
  withdraw,
  istContribution,
  useDescription,
  useCampaignStatus,
  useCampaignBalance,
  useGetTier,
  useCampaignGoal,
} from "@/hooks/use-campaign-operations";
import React, { useState } from "react";
import { Address } from "viem";

export default function TestPage() {
  const [contractAddress, setContractAddress] = useState<Address>("0xecF93675Ea42Cd57f06c47DC21a2e9dc1a991f50"); // Kontrat adresi
  const [tierName, setTierName] = useState<string>("");
  const [tierAmount, setTierAmount] = useState<bigint>(BigInt(0));
  const [tierIndex, setTierIndex] = useState<bigint>(BigInt(1));
  const [daysToAdd, setDaysToAdd] = useState<bigint>(BigInt(0));
  const [backerAddress, setBackerAddress] = useState<Address>("0x03Eb05714B72Da457cE1a6B6d1a2F8147b56DCA8");

  const { isPaused, error: pausedError, isLoading: pausedLoading } = useIsPaused(contractAddress);
  const { description, error: descriptionError, isLoading: descriptionLoading } = useDescription(contractAddress);
  const { status, error: statusError, isLoading: statusLoading } = useCampaignStatus(contractAddress);
  const { balance, error: balanceError, isLoading: balanceLoading } = useCampaignBalance(contractAddress);
  const { tier, error: tierError, isLoading: tierLoading } = useGetTier(contractAddress, tierIndex);
  const { goalAmount, goalError, goalLoading } = useCampaignGoal(contractAddress);
  const { amount, error: contributionError, isLoading: contributionLoading } = istContribution(contractAddress, backerAddress);

  const handleTogglePause = async () => {
    try {
      await togglePause(contractAddress);
      alert("Paused state toggled!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTier = async () => {
    try {
      await addTier(contractAddress, { name: tierName, amount: tierAmount });
      alert("Tier added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTier = async () => {
    try {
      await removeTier(contractAddress, tierIndex);
      alert("Tier removed successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleExtendDeadline = async () => {
    try {
      await extendDeadline(contractAddress, daysToAdd);
      alert("Deadline extended!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFund = async () => {
    try {
      await fund(contractAddress, tierIndex);
      alert("Fund successful!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefund = async () => {
    try {
      await refund(contractAddress);
      alert("Refund processed!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw(contractAddress);
      alert("Withdraw successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Contract Interaction Test Page</h1>

      <div>
        <label>Contract Address:</label>
        <input type="text" value={contractAddress} onChange={(e) => setContractAddress(e.target.value as Address)} />
      </div>

      <h2>Campaign Goal</h2>
      <CampaignGoal />

      <h2>Toggle Pause</h2>
      <button onClick={handleTogglePause} disabled={pausedLoading}>
        Toggle Pause
      </button>
      {pausedLoading && <p>Loading...</p>}
      {pausedError && <p>Error: {pausedError.message}</p>}
      <p>Paused State: {isPaused ? "Paused" : "Active"}</p>

      <h2>Add Tier</h2>
      <input type="text" placeholder="Tier Name" value={tierName} onChange={(e) => setTierName(e.target.value)} />
      <input type="number" placeholder="Tier Amount" value={tierAmount.toString()} onChange={(e) => setTierAmount(BigInt(e.target.value))} />
      <button onClick={handleAddTier}>Add Tier</button>

      <h2>Remove Tier</h2>
      <input type="number" placeholder="Tier Index" value={tierIndex.toString()} onChange={(e) => setTierIndex(BigInt(e.target.value))} />
      <button onClick={handleRemoveTier}>Remove Tier</button>

      <h2>Extend Deadline</h2>
      <input type="number" placeholder="Days to Add" value={daysToAdd.toString()} onChange={(e) => setDaysToAdd(BigInt(e.target.value))} />
      <button onClick={handleExtendDeadline}>Extend Deadline</button>

      <h2>Fund</h2>
      <button onClick={handleFund}>Fund</button>

      <h2>Refund</h2>
      <button onClick={handleRefund}>Refund</button>

      <h2>Withdraw</h2>
      <button onClick={handleWithdraw}>Withdraw</button>

      <h2>Campaign Description</h2>
      {descriptionLoading && <p>Loading...</p>}
      {descriptionError && <p>Error: {descriptionError.message}</p>}
      <p>Description: {description}</p>

      <h2>Campaign Status</h2>
      {statusLoading && <p>Loading...</p>}
      {statusError && <p>Error: {statusError.message}</p>}
      <p>Status: {status}</p>

      <h2>Campaign Balance</h2>
      {balanceLoading && <p>Loading...</p>}
      {balanceError && <p>Error: {balanceError.message}</p>}
      <p>Balance: {balance}</p>

      <h2>Get Tier</h2>
      {tierLoading && <p>Loading...</p>}
      {tierError && <p>Error: {tierError}</p>}
      {tier && (
        <div>
          <p>Name: {tier.name}</p>
          <p>Amount: {tier.amount.toString()}</p>
          <p>Backers: {tier.backers.toString()}</p>
        </div>
      )}

      <h2>Campaign Goal</h2>
      {goalLoading && <p>Loading...</p>}
      {goalError && <p>Error: {goalError.message}</p>}
      <p>Goal Amount: {goalAmount !== null ? `${goalAmount} wei` : "Not available"}</p>
    </div>
  );
}
