/**
 * Created with PyCharm.
 * User: selcuk
 * Date: 6/7/13
 * Time: 9:00 PM
 * To change this template use File | Settings | File Templates.
 */

(function ( $ ) {
    $.fn.SGTable = function() {
        this.tableName = this.attr('id')+"_SGTbl";
        this.data = [];
        this.totalCol = 0;
        this.totalRow = 0;
        this.maxRow = 5;
        this.totalPage = 0;
        this.pageIndex = 0;
        //DEBUGconsole.log(this.tableName);
        this.addRow = function(){
            //DEBUGconsole.log("adding row");
            var newRow = $("<tr><td>hi</td></tr>");
            $("#"+this.tableName).append(newRow);

        };
        var activateEdit = function(){
            //activating jEditable
            $('.SGTable td').editable(function(value, settings) {
                //DEBUGconsole.log("this",this.getAttribute('id'));
                updateCell(this.getAttribute('id'), value);
                //DEBUGconsole.log("value",value);
                //DEBUGconsole.log("settings",settings);
                return(value);
            }, {
                height:'auto',
                width:100
               // type    : 'textarea'
                //submit  : 'OK'
            });
        }
        var updateCell = function(cellStr, newValue){
            col = cellStr.match(/_.+$/g)[0];
            col = parseInt(col.replace("_",""));
            //DEBUGconsole.log("col:", col);
            row = cellStr.match(/^.+_/g)[0];
            row = parseInt(row.replace("_",""));
            //DEBUGconsole.log("row:", row);
            //DEBUGconsole.log("updating local data...", cellStr);
            this.data[row,col] = newValue;
            //DEBUGconsole.log("updated local data @",row,col, "newValue:", this.data[row,col]);

        };
        var self = this;
        this.newData =function(data){
            this.data = data;
            //DEBUGconsole.log(JSON.stringify(data));
            this.totalRow = data['content'].length;
            this.totalCol = data['content'][0].length;
            this.totalPage = Math.ceil(this.totalRow/this.maxRow);
            this.pageIndex = 0;
            //DEBUGconsole.log("TOTAL ROWS:", this.totalRow);
            //DEBUGconsole.log("TOTAL PAGES:", this.totalPage);
            //DEBUGconsole.log("PRESENT PAGE:", this.pageIndex);
            var newTable = "";
            this.rowDisplayed = Math.min(this.totalRow,this.maxRow );
            for (var i = 0; i<this.rowDisplayed; i++){
                newTable += "<tr>";
                for (var j = 0; j<this.totalCol; j++){
                    id = i.toString()+"_"+j.toString();
                    newTable +="<td id= "+id+  " >"+data['content'][i][j]+"</td>";

                }
                newTable += "</tr>";
            }
            $("#"+this.tableName).html(newTable);

            activateEdit();
            $("#"+this.tableName+"Info").html("Page "+(this.pageIndex+1).toString()+"/"+this.totalPage);
        };
        this.prePage = function(){
            if (this.pageIndex){
                this.pageIndex--;
                var startRow = this.pageIndex * this.maxRow;
                var endRow = Math.min(startRow+this.maxRow-1,this.totalRow-1);
                var newTable = "";
                this.rowDisplayed = Math.min(this.totalRow,this.maxRow );
                for (var i = startRow; i<=endRow; i++){
                    newTable += "<tr>";
                    for (var j = 0; j<this.totalCol; j++){
                        id = i.toString()+"_"+j.toString();
                        newTable +="<td id= "+id+  " >"+this.data['content'][i][j]+"</td>";

                    }
                    newTable += "</tr>";
                }
                $("#"+this.tableName).html(newTable);

                activateEdit();

                $("#"+this.tableName+"Info").html("Page "+(this.pageIndex+1).toString()+"/"+this.totalPage);

            }
            //DEBUGconsole.log("Switching to page:", this.pageIndex);
        };
        this.nextPage = function(){
            if (this.pageIndex<this.totalPage-1){
                this.pageIndex++;
                var startRow = this.pageIndex * this.maxRow;
                var endRow = Math.min(startRow+this.maxRow-1,this.totalRow-1);
                var newTable = "";
                //DEBUGconsole.log('startRow',startRow);
                //DEBUGconsole.log('endrow',endRow);
                this.rowDisplayed = Math.min(this.totalRow,this.maxRow );
                for (var i = startRow; i<=endRow; i++){
                    newTable += "<tr>";
                    for (var j = 0; j<this.totalCol; j++){
                        id = i.toString()+"_"+j.toString();
                        //DEBUGconsole.log('i:',i,'j',j);
                        //DEBUGconsole.log("DATA:",this.data['content']);
                        newTable +="<td id= "+id+  " >"+this.data['content'][i][j]+"</td>";

                    }
                    newTable += "</tr>";
                }
                $("#"+this.tableName).html(newTable);

                activateEdit();
                $("#"+this.tableName+"Info").html("Page "+(this.pageIndex+1).toString()+"/"+this.totalPage);

            }
            //DEBUGconsole.log("Switching to page:", this.pageIndex);
        };



        this.html('<table id='+this.tableName+' class="SGTable"><tbody></tbody></table>');
        this.append("<div id="+this.tableName+"Info"+  " class='SGTableInfo'></div>");
        this.append('<div id='+this.tableName+'Nav'+  ' class="SGTableNav"></div>');
        $('#'+this.tableName+'Nav').append('<div id='+this.tableName+'Next'+  ' class="SGTableNext">Next</div>' );
        $('#'+this.tableName+'Nav').append('<div id='+this.tableName+'Pre'+  ' class="SGTablePre">Previous</div>' );
        var self = this;
        $('#'+this.tableName+'Pre').click(function(){self.prePage();});
        $('#'+this.tableName+'Next').click(function(){self.nextPage();});
        return this;
    };

}( jQuery ));
