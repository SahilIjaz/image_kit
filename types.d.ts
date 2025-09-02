import { Connecion } from "mongoose";
declare global {
  var mongoose: {
    conn: Connecion | null;
    promise: Promise<Connection> | null;
  };
}

export {};
