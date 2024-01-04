import { ChildProcess, spawn } from 'child_process';

export class PredictedProcess {
  private _childProcess: ChildProcess | null = null;
  private _memoizedResults: Map<AbortSignal, Promise<void>> = new Map();
  private _isTerminated: boolean = false;

  public constructor(
    public readonly id: number,
    public readonly command: string,
  ) {}

  public async run(signal?: AbortSignal): Promise<void> {
    if (signal && signal.aborted) {
      return Promise.reject(new Error('Signal already aborted'));
    }

    const existingMemoized = signal ? this._memoizedResults.get(signal) : undefined;
    if (!existingMemoized) {
      const promise = new Promise<void>((resolve, reject) => {
        const child = spawn(this.command, {
          shell: true,
          stdio: 'inherit',
        });

        this._childProcess = child;

        child.on('error', (err) => {
          this._isTerminated = true;
          this.cleanup();
          reject(err);
        });

        child.on('close', (code, signal) => {
          if (code === 0) {
            resolve();
          } else {
            this._isTerminated = true;
            reject(new Error(`Process exited with code ${code} and signal ${signal}`));
          }
          this.cleanup();
        });

        if (signal) {
          signal.addEventListener('abort', () => {
            this._isTerminated = true;
            reject(new Error('Signal aborted during execution'));
            this.cleanup();
          }, { once: true });
        }
      });

      if (signal && !this._isTerminated) {
        this._memoizedResults.set(signal, promise);
      }
      return promise;
    } else {
      return existingMemoized;
    }
  }

  public memoize(): PredictedProcess {
    const memoizedProcess = new PredictedProcess(this.id, this.command);
    memoizedProcess._memoizedResults = this._memoizedResults;
    return memoizedProcess;
  }

  private cleanup() {
    if (this._childProcess) {
      this._childProcess.removeAllListeners();
      this._childProcess.kill('SIGTERM');
      this._childProcess = null;
    }
  }
}



// import { ChildProcess, spawn } from 'child_process';

// export class PredictedProcess {
//   private _childProcess: ChildProcess | null = null;
//   private _memoizedResults: Map<AbortSignal, Promise<void>> = new Map();
//   private _errorTracker: Map<string, string> = new Map();
//   private _isTerminated: boolean = false;
//   public constructor(
//     public readonly id: number,
//     public readonly command: string,
//   ) {}

//   public async run(signal?: AbortSignal): Promise<void> {
//     if (signal && signal.aborted) {
//       return Promise.reject(new Error('Signal already aborted'));
//     } else if (!signal || !this._memoizedResults.has(signal)) {
//       const promise = new Promise<void>((resolve, reject) => {
//         const child = spawn(this.command, {
//           shell: true,
//           stdio: 'inherit',
//         });

//         this._childProcess = child;

//         child.on('error', (err) => {
//             this._errorTracker.set(this.command, this.command)
//             this._isTerminated = true;
//             this.cleanup();
//             return reject(err);
//         });

//         child.on('close', (code, signal) => {
//           if (code === 0 && !this._errorTracker.has(this.command)) {
//             resolve();
//           } else {
//             this._isTerminated = true;
//             reject(
//               new Error(
//                 `Process exited with code ${code} and signal ${signal}`,
//               ),
//             );
//           }
//           this.cleanup();
//         });
        
//         if (signal) {
//           signal.addEventListener(
//             'abort',
//             () => {
//               this._isTerminated = true;
//               reject(new Error('Signal aborted during execution'));
//               this.cleanup();
//             },
//             { once: true },
//           );
//         }
//       });
//       if (signal && !this._isTerminated) {
//         this._memoizedResults.set(signal, promise);
//       }

//       return promise;
//     } else if (!this._memoizedResults.has(signal)) {
//       return Promise.reject(new Error('No such process found'));
//     } else {
//       // Handle existing memoized promise for the signal
//       const memoizedPromise = this._memoizedResults.get(signal);
//       return memoizedPromise as Promise<void>;
//     }
//   }



//   public memoize(): PredictedProcess {
//     const memoizedProcess = new PredictedProcess(this.id, this.command);
//     memoizedProcess._memoizedResults = this._memoizedResults;
//     return memoizedProcess;
//   }

//   private cleanup() {
//     if (this._childProcess) {
//       this._childProcess.removeAllListeners();
//       this._childProcess.kill('SIGTERM');
//       this._childProcess = null;
//       this._errorTracker = new Map()
//     }
//   }
// }
