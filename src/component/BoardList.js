import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function BoardList({ boardList, currentBoard, onChange, ...rest }) {
  return (
    <Modal {...rest}>
      <ModalHeader toggle={rest.toggle}>Board list</ModalHeader>
      <ModalBody>
        {boardList.map(board =>
          <Button
            color="primary"
            outline
            block
            key={board}
            disabled={currentBoard === board}
            onClick={() => { onChange(board); rest.toggle(); }}
          >
            {board}
            {currentBoard === board && ' (current board)'}
          </Button>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={rest.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default BoardList;
