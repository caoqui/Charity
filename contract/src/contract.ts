import { NearBindgen, near, call, view, initialize, UnorderedMap, NearPromise } from 'near-sdk-js';

@NearBindgen({})
class charity {
  listPhilanthropist: any;
  listRegister: any;

  constructor() {
    this.listPhilanthropist = new UnorderedMap("a");
    this.listRegister = new UnorderedMap("b");
  }

  @initialize({})
  init() {
    this.listPhilanthropist = new UnorderedMap("a");
    this.listRegister = new UnorderedMap("b");
  }

  @view({})
  viewListPhilanthropist() {
    let listRs = "";
    for (let phi of this.listPhilanthropist) {
      listRs = listRs + phi + " ";
    }
    return listRs;
  }


  @view({ privateFunction: true })
  viewListRegister() {
    let listRs = "";

    for (let reg of this.listRegister) {
      listRs = listRs + reg + " ";
    }

    return listRs;
  }


  @call({ privateFunction: true })
  addPhilanthropist({ philanthropist }: { philanthropist: string }) {
    try {
      if (!this.listPhilanthropist.get(philanthropist)) {
        this.listPhilanthropist.set(philanthropist, "0");
        this.listRegister.remove(philanthropist);
      } else {
        near.log("This account existed.");
      }
    } catch (error) {
      near.log("Create philanthropist failure.");
    }
  }

  @call({ payableFunction: true })
  addRegister() {
    try {
      if (!this.listRegister.get(near.signerAccountId())) {
        this.listRegister.set(near.signerAccountId(), true)
        near.log("register successfully!")
      } else {
        near.log("The account existed in list.")
      }
    } catch (error) {
      near.log("Cant add this register")
    }
  }

  @call({ payableFunction: true })
  contributePrice({ idPhilanthropist }: { idPhilanthropist: string }) {
    const amount: bigint = near.attachedDeposit();
    if (amount > BigInt(0)) {
      const newAmount: bigint = BigInt(this.listPhilanthropist.get(idPhilanthropist)) + amount
      this.listPhilanthropist.set(idPhilanthropist, String(newAmount));
      near.log(near.signerAccountId(), " contributed to ", idPhilanthropist, amount);
    }
  }

  @call({ privateFunction: true })
  removeRegister({ idRegister }) {
    if (!this.listRegister.get(idRegister)) return;
    this.listRegister.remove(idRegister);
    near.log("Removed register ", idRegister, "sccessfully!");
  }

  @call({ privateFunction: true })
  acceptRegister({ idRegister }) {
    if (!this.listRegister.get(idRegister)) return;
    this.listRegister.remove(idRegister);
    if (this.listPhilanthropist.get(idRegister) != "0") {
      this.listPhilanthropist.set(idRegister, "0")
    }
    near.log("Accepted", idRegister, "sccessfully!");
  }


  @call({})
  reedemOne() {
      if (!this.listPhilanthropist.get(near.signerAccountId())) return;
      else {
        const value = this.listPhilanthropist.get(near.signerAccountId());
        const reedemAmount: bigint = BigInt(value);
        
        this.listPhilanthropist.remove(near.signerAccountId());
        near.log("Reedem successfully!.")

        return NearPromise.new(near.signerAccountId()).transfer(reedemAmount);
      }
  }
}