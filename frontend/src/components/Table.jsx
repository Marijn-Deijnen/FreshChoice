import "./Table.css";

const Table = () => {
  return (
    <table>
        <tr>
        <th>Product</th>
        <th>Prijs</th>
        <th>Barcode</th>
        <th>SKU</th>
        <th>Voorraad</th>
        <th>Aanpassen</th>
</tr>
<tr>
    <td>Appel</td>
    <td>€1,45</td>
    <td>1858742704</td>
    <td>5835-1839</td>
    <td>54</td>
    <td>EDIT</td>
</tr>
<tr>
    <td>Peer</td>
    <td>€1,55</td>
    <td>693074709</td>
    <td>0128-3291</td>
    <td>89</td>
    <td>EDIT</td>
    </tr>
    <tr>
    <td>Tomaat</td>
    <td>€1,10</td>
    <td>359635678</td>
    <td>0537-8942</td>
    <td>8</td>
    <td>EDIT</td>
    </tr>
    </table>
   
  );
};

export default Table;