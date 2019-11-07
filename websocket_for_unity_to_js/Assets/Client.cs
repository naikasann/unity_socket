using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
 
public class Client : MonoBehaviour
{
    WebSocket ws;
    string[] receive_list;
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
            //データ受信
            temp_receive = e.Data;
            //データリセット
            request_list.Clear();
            //request_list <= [[connectionlist_number][motionlist]]
            receive_list = temp_receive.Split(',');
            for(int i = 0;i < receive_list.Length;i += 2){
                string[] buff = {receive_list[i], receive_list[i + 1]};
                request_list.Add(buff);
            }
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
            log += dir.ToString();
        }
        Debug.Log(log);
    }
    void showlist_(IReadOnlyCollection<string[]> check_list){
        string log = "";
        foreach(string[] dir in check_list){
            log += "[";
            foreach(string dirr in dir){
                log += dirr + ",";
            }
            log += "]";
        }
        Debug.Log(log);
    }
    
}