import { PredictedProcess } from './PredictedProcessTrial';

export class PredictedProcessesManager {
  private _processes: PredictedProcess[] = [];

  public constructor(processes: readonly PredictedProcess[] = []) {
    this._processes = [...processes];
  }

  public get processes(): readonly PredictedProcess[] {
    return [...this._processes];
  }

  public addProcess(process: PredictedProcess): this {
    this._processes.push(process);
    return this;
  }

  public removeProcess(id: number): this {
    this._processes = this._processes.filter((process) => process.id !== id);
    return this;
  }

  public getProcess(id: number): PredictedProcess | undefined {
    return this._processes.find((process) => process.id === id);
  }

  public async runAll(signal?: AbortSignal): Promise<void> {
    await Promise.all(
      this._processes.map((process) => (signal ? process.run(signal) : process.run()))
    );
  }
}