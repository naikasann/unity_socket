using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
 
public class Client : MonoBehaviour
{
    WebSocket ws;
    private List<string> receive_list = new List<string>();
    private List<string[]> request_list = new List<string[]>();

    void Start(){
        string temp_receive;

        ws = new WebSocket("ws://localhost:443/");
 
        ws.OnOpen += (sender, e) =>
        {
            Debug.Log("ws connected");
        };

        ws.OnMessage += (sender, e) =>
        {
            temp_receive = e.Data;
            //リストの初期化
            receive_list.Clear();
            request_list.Clear();
            //配列をリストにコピー
            for(int i = 0; i < temp_receive.Length; i++){
                if(!(i % 2 == 1)){
                    ///////////////////////////////////////
                    //二桁が入力された場合。バグが生じる。
                    ////////////////////////////////////
                    receive_list.Add(temp_receive[i].ToString());
                }
            }
            //Requestlist <= {[member_number][motion_list]}
            for(int i = 0; i< receive_list.Count; i += 2){
                string[] tmp = {receive_list[i], receive_list[i+1]};
                request_list.Add(tmp);
            }
            //配列の表示
            showlist_(request_list);
        };
 
        ws.OnClose += (sender, e) =>
        {
            Debug.Log("WebSocket Close");
        };

        ws.Connect();
 
    }
 
    void Update(){
        if (Input.GetKeyUp("1")){
            Debug.Log("1");
            ws.Send("1");
        }
        if(Input.GetKeyUp("2")){
            Debug.Log("2");
            ws.Send("2");
        }
 
    }
 
    void OnDestroy(){
        ws.Close();
        ws = null;
    }

    /******************************************************************************
    *                   debug function
     *****************************************************************************/
    void showlist(IReadOnlyCollection<string> check_list){
        string log = "";
        foreach(string dir in check_list){
            log += dir.ToString() + ",";
        }
        Debug.Log(log);
    }
    void showlist_(IReadOnlyCollection<string[]> check_list){
        string log = "";
        foreach(string[] dir in check_list){
            foreach(string dirr in dir){
                log += dirr + ",";
            }
        }
        Debug.Log(log);
    }
    
}