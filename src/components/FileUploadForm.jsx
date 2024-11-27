// import React, { useState } from 'react';
// import { Form, Input, Upload, Button, message } from 'antd';
// import { UploadOutlined, FolderOpenOutlined } from '@ant-design/icons';

// const FileUploadForm = () => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);
//   const [directoryPath, setDirectoryPath] = useState('');

//   // Fonction pour gérer la soumission du formulaire
//   const handleSubmit = (values) => {
//     console.log('Fichiers:', fileList);
//     console.log('Emplacement:', directoryPath);

//     if (fileList.length > 0 && directoryPath) {
//       message.success('Fichiers déplacés avec succès vers le dossier sélectionné !');
//     } else {
//       message.error('Veuillez sélectionner un fichier et un dossier.');
//     }
//   };

//   // Gérer la sélection des fichiers
//   const handleFileChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   // Fonction pour sélectionner un dossier (en local)
//   const handleSelectDirectory = async () => {
//     if (window.showDirectoryPicker) {
//       try {
//         const dirHandle = await window.showDirectoryPicker();
//         const path = dirHandle.name;

//         setDirectoryPath(path);
//         message.success(`Dossier sélectionné : ${path}`);
//       } catch (error) {
//         if (error.name === 'AbortError') {
//           message.warning('Sélection du dossier annulée.');
//         } else {
//           console.error('Erreur lors de la sélection du dossier:', error);
//           message.error('Impossible de sélectionner un dossier.');
//         }
//       }
//     } else {
//       // Option pour les navigateurs non compatibles avec showDirectoryPicker
//       message.warning('Votre navigateur ne supporte pas la sélection de dossiers.');
//       const inputElement = document.createElement('input');
//       inputElement.type = 'file';
//       inputElement.webkitdirectory = true;
//       inputElement.onchange = (e) => {
//         const selectedPath = e.target.files[0]?.webkitRelativePath?.split('/')[0] || '';
//         setDirectoryPath(selectedPath);
//         if (selectedPath) {
//           message.success(`Dossier approximatif sélectionné : ${selectedPath}`);
//         }
//       };
//       inputElement.click();
//     }
//   };

//   return (
//     <div style={{ width: 400,height:260 , padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
//       <h2 style={{ textAlign: 'center' }}>Gestionnaire de fichiers</h2>
//       <Form form={form} layout="vertical" onFinish={handleSubmit}>
//         <Form.Item label="Fichiers" name="files">
//           <Upload
//             onChange={handleFileChange}
//             beforeUpload={() => false}
//             fileList={fileList}
//             multiple
//             listType="text"
//           >
//             <Button icon={<UploadOutlined />}>Sélectionner des fichiers</Button>
//           </Upload>
//         </Form.Item>

//         {/* Bouton pour sélectionner un dossier */}
//         <Form.Item label="Dossier de destination">
//           <div style={{ display: 'flex', gap: 8 }}>
//             <Input value={directoryPath} placeholder="Sélectionner un dossier" readOnly />
//             <Button icon={<FolderOpenOutlined />} onClick={handleSelectDirectory}>
//               Parcourir
//             </Button>
//           </div>
//         </Form.Item>

//         {/* Bouton de soumission */}
//         <Form.Item>
//           <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
//             Soumettre
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default FileUploadForm;



import React, { useState } from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined, FolderOpenOutlined } from '@ant-design/icons';
import axios from 'axios';

const FileUploadForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [directoryPath, setDirectoryPath] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (values) => {
    console.log('Fichiers:', fileList);
    console.log('Emplacement:', directoryPath);

    // Vérifier si les fichiers et le dossier sont sélectionnés
    if (fileList.length > 0 && directoryPath) {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('files', file.originFileObj);
      });
      formData.append('directoryPath', directoryPath);

      try {
        // Envoi des fichiers au backend
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        message.success('Fichiers téléchargés avec succès!');
      } catch (error) {
        console.error('Erreur lors de l\'upload:', error);
        message.error('Une erreur est survenue lors de l\'upload des fichiers.');
      }
    } else {
      message.error('Veuillez sélectionner des fichiers et un dossier.');
    }
  };

  // Gérer la sélection des fichiers
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Fonction pour sélectionner un dossier
  const handleSelectDirectory = async () => {
    if (window.showDirectoryPicker) {
      try {
        const dirHandle = await window.showDirectoryPicker();
        const path = dirHandle.name;
        setDirectoryPath(path);
        message.success(`Dossier sélectionné : ${path}`);
      } catch (error) {
        if (error.name === 'AbortError') {
          message.warning('Sélection du dossier annulée.');
        } else {
          console.error('Erreur lors de la sélection du dossier:', error);
          message.error('Impossible de sélectionner un dossier.');
        }
      }
    } else {
      message.warning('Votre navigateur ne supporte pas la sélection de dossiers.');
      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      inputElement.webkitdirectory = true;
      inputElement.onchange = (e) => {
        const selectedPath = e.target.files[0]?.webkitRelativePath?.split('/')[0] || '';
        setDirectoryPath(selectedPath);
        if (selectedPath) {
          message.success(`Dossier approximatif sélectionné : ${selectedPath}`);
        }
      };
      inputElement.click();
    }
  };

  return (
    <div style={{ width: 400, height: 260, padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Gestionnaire de fichiers</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Fichiers" name="files">
          <Upload
            onChange={handleFileChange}
            beforeUpload={() => false}
            fileList={fileList}
            multiple
            listType="text"
          >
            <Button icon={<UploadOutlined />}>Sélectionner des fichiers</Button>
          </Upload>
        </Form.Item>

        {/* Sélectionner le dossier de destination */}
        <Form.Item label="Dossier de destination">
          <div style={{ display: 'flex', gap: 8 }}>
            <Input value={directoryPath} placeholder="Sélectionner un dossier" readOnly />
            <Button icon={<FolderOpenOutlined />} onClick={handleSelectDirectory}>
              Parcourir
            </Button>
          </div>
        </Form.Item>

        {/* Bouton de soumission */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Soumettre
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FileUploadForm;
