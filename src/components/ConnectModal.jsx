import React, { useState } from "react";
import { Input, Modal } from "antd";
import { Wallet, validateMnemonic, VoyageProvider } from "js-moi-sdk";
import { toastError } from "../utils/toastWrapper";
import AppContext from "../Context/context";

const provider = new VoyageProvider("babylon");
const account = "m/44'/6174'/7020'/0/0"; // 0th account path derivation

const ConnectModal = ({ isModalOpen, updateWallet, showConnectModal }) => {
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");

  return (
    <AppContext.Consumer>
      {value => {
        const {isModalOpen, setIsModalOpen} = value


        const handleConnect = async (mnemonic) => {
          try {
            if (!validateMnemonic(mnemonic)) {
              return setError("Incorrect mnemonic");
            }
      
            const wallet = new Wallet(provider);
            await wallet.fromMnemonic(mnemonic, account);
            updateWallet(wallet);
      
            setError("");
            setIsModalOpen(false);
          } catch (error) {
            toastError(error.message);
          }
        };
      
        const handleCancel = () => {
          setError("");
          setIsModalOpen(false);
        };
      
        return (
          <>
            <Modal
              title="Enter Mnemonic"
              open={isModalOpen}
              onOk={() => handleConnect(mnemonic)}
              onCancel={handleCancel}
              destroyOnClose={true}
            >
              <Input
                style={{ border: "1px solid black" }}
                onChange={(e) => setMnemonic(e.target.value)}
              />
              {error && <p style={{ color: "red", fontWeight: 700, textAlign: "center" }}>{error}</p>}
            </Modal>
          </>
        );
      }}
    </AppContext.Consumer>
  )

  
};
export default ConnectModal;
