import React, { ReactNode } from 'react';
import { SpinnerIcon } from './Icons';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
  isSaving?: boolean;
  error?: string;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, onSave, isSaving, error }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 capitalize">{title}</h3>
          <div className="mt-4">
            {children}
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
        <div className="bg-slate-50 px-6 py-3 flex justify-end gap-3 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 bg-sky-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-sky-700 focus:outline-none flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving && <SpinnerIcon className="w-5 h-5" />}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;