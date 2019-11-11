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
        string get_key = return_get_keyborad();
        if(get_key != null)    Debug.Log(get_key);
    }
 
    void OnDestroy(){
        ws.Close();
        ws = null;
    }

    /******************************************************************************
    *                   debug function
     *****************************************************************************/
    string return_get_keyborad(){
        if (Input.GetKeyUp("0"))   return "0";
        if (Input.GetKeyUp("1"))   return "1";
        if (Input.GetKeyUp("2"))   return "2";
        if (Input.GetKeyUp("3"))   return "3";
        if (Input.GetKeyUp("4"))   return "4";
        if (Input.GetKeyUp("5"))   return "5";
        if (Input.GetKeyUp("6"))   return "6";
        if (Input.GetKeyUp("7"))   return "7";
        if (Input.GetKeyUp("8"))   return "8";
        if (Input.GetKeyUp("9"))   return "9";
        return null;
    }

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