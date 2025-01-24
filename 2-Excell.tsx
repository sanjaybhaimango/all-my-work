import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import * as xlsx from "xlsx";

interface ExcelData {
  name: string;
  email: string;
  phoneno: string;
}

const Excell: React.FC = () => {
  const [excelData, setExcelData] = useState<ExcelData[]>([]);

  const fetchExcel = async () => {
    try {
      // Fetch the file from the public folder
      const response = await fetch("/data1.xlsx"); // Adjust the path based on the file location in `public`
      const data = await response.arrayBuffer();

      // Parse the Excel file
      const workbook = xlsx.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: ExcelData[] = xlsx.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error("Error fetching or parsing Excel file:", error);
    }
  };

  useEffect(() => {
    fetchExcel(); // Fetch the Excel file on component mount
  }, []);

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row fthight">
          <div className="col-md-12">
            <h3 className="mt-3">Fetch Excel Data from Public Folder</h3>
          </div>

          <div className="col-md-12 mt-3">
            {excelData.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>new</th>
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneno}</td>
                      <td>{item.new}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading Excel data...</p>
            )}
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Excell;
