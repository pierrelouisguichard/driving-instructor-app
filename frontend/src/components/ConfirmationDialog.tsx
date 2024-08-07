// import React from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
// } from "@mui/material";

// interface ConfirmationDialogProps {
//   open: boolean;
//   title: string;
//   description: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
//   open,
//   title,
//   description,
//   onConfirm,
//   onCancel,
// }) => {
//   return (
//     <Dialog open={open} onClose={onCancel}>
//       <DialogTitle>{title}</DialogTitle>
//       <DialogContent>
//         <DialogContentText>{description}</DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onCancel} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={onConfirm} color="primary" autoFocus>
//           Confirm
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ConfirmationDialog;

import React from "react";
import styled from "styled-components";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  singleButton: boolean; // New prop to determine if the dialog should have one or two buttons
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  singleButton,
}) => {
  if (!open) return null;

  return (
    <DialogOverlay>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription
          dangerouslySetInnerHTML={{ __html: description }}></DialogDescription>
        <DialogButtonContainer>
          {singleButton ? (
            <DialogButton onClick={onCancel} color="#4CAF50">
              Okay
            </DialogButton>
          ) : (
            <>
              <DialogButton onClick={onCancel} color="#F44336">
                Cancel
              </DialogButton>
              <DialogButton onClick={onConfirm} color="#4CAF50">
                Confirm
              </DialogButton>
            </>
          )}
        </DialogButtonContainer>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ConfirmationDialog;

// Styles for ConfirmationDialog
const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const DialogTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
`;

const DialogDescription = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  font-weight: normal;
`;

const DialogButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const DialogButton = styled.button<{ color: string }>`
  padding: 10px 20px;
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }
`;
