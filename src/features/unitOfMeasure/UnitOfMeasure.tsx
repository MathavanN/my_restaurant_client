import { useState } from 'react';
import DeleteUnitOfMeasure from './DeleteUnitOfMeasure';

import EditUnitOfMeasure from './EditUnitOfMeasure';
import UnitOfMeasureList from './UnitOfMeasureList';

const UnitOfMeasure = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  return (
    <>
      <UnitOfMeasureList
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
      />
      <EditUnitOfMeasure openEdit={openEdit} handleOpenEdit={handleOpenEdit} />
      <DeleteUnitOfMeasure
        openDelete={openDelete}
        handleOpenDelete={handleOpenDelete}
      />
    </>
  );
};

export default UnitOfMeasure;
