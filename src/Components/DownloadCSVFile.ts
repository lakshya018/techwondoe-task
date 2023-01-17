/* eslint-disable */
export const exportTableToCSV = (allUsers : any) => {
    let csv = "Name,Email,Role,Status,Login Date,Login Time\n";

    allUsers.forEach((user: any) => {
        const date = new Date(user.createdAt);
        const newDate = date.toString();
        const time = date.toLocaleTimeString();
        const newTime = time.toString();

        let row = user.name + "," + user.email + "," + user.role + ",";
        if(user.status === true){
            row+="Active,";
        }
        else{
            row+="Inactive,";
        }
        row+=newDate.substr(4, 11) + "," + newTime + "\n";

        csv+=row;
    })

    let data = new Blob([csv], { type: "text/csv" });

    downloadTable(data, "Users_Table.csv");

}

const downloadTable = (data :any, fileName : any) => {
    const nav = window.navigator as any;
    if(nav.msSaveOrOpenBlob){
        nav.msSaveOrOpenBlob(data, fileName);
    }
    else{
        const url = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = fileName;
        a.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 500);
    }
}
/* eslint-disable */