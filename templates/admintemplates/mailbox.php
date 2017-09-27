<div class="row" id="topNavigation">
    <div class="col-md-1"></div>
    <div class="col-md-10 col-sm-10">
        <table class="table table-responsive">
            <thead>
            <td>
                <select id="actionDropdown" name="actionDropdown">
                    <option value="2" disabled selected>Izaberi opciju</option>
                    <option value="0">Obriši</option>
                    <option value="1" id="optionMarkRead">Označi kao pročitano</option>
                </select>
            </td>
            <td id="inboxReceive">Pristigle</td>
            <td id="outboxSent">Poslate</td>

            </thead>
        </table>
    </div>
</div>
<div class="row" id="mailContainer">

    <div class="col-md-12 " id="rightBar">

        <div class="row" id="mailContent">
            <table class="table table-responsive">
                <thead id="tableHeader">
                  <tr id="headerRow">
                    <td class="messageHeader"><input type="checkbox" name="allSelect" id="allSelect"></td>
                    <td class="messageHeader" id="who">Pošiljalac:</td>
                    <td class="messageHeader" id="subjectField">Naslov</td>
                    <td class="messageHeader">Poruka</td>
                    <td class="messageHeader">Više</td>
                    </tr>
                </thead>
                <tbody id="tableBodyInbox">

                </tbody>
            </table>
        </div>
    </div>
</div>
