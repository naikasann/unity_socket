using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
 
public class Client : MonoBehaviour
{
    WebSocket ws;
    string[] receive_list;
    private List<string> motion_list = new List<string>();
    private List<string> member_list = new List<string>();

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
            member_list.Clear();
            motion_list.Clear();
            //request_list <= [[connectionlist_number][motionlist]]
            receive_list = temp_receive.Split(',');
            for(int i = 0;i < receive_list.Length;i += 2){
                member_list.Add(receive_list[i]);
                motion_list.Add(receive_list[i + 1]);
            }
            showlist(motion_list);
            showlist(member_list);
        };
 
        ws.OnClose += (sender, e) =>
        {
            Debug.Log("WebSocket Close");
        };

        ws.Connect();
 
    }
 
    void Update(){
        string get_key = return_get_keyborad();
        int send_msg;

        if(get_key != null){
            Debug.Log(get_key);
            if(motion_list.Contains(get_key)){
                send_msg = check_motionlist_to_memberlist(get_key);
                ws.Send("1," + send_msg.ToString());
            }
        }
    }
 
    void OnDestroy(){
        ws.Close();
        ws = null;
    }
    int check_motionlist_to_memberlist(string seach_number){
        string buff = seach_number;
        for(int i = 0; i < motion_list.Count; i++){
            if(motion_list[i] == buff){
                return int.Parse(member_list[i]);
            }
        }

        return -1;
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
        if (Input.GetKeyUp("a"))   return "a";
        if (Input.GetKeyUp("b"))   return "b";
        if (Input.GetKeyUp("c"))   return "c";
        if (Input.GetKeyUp("d"))   return "d";
        if (Input.GetKeyUp("e"))   return "e";
        if (Input.GetKeyUp("f"))   return "f";
        if (Input.GetKeyUp("g"))   return "g";
        if (Input.GetKeyUp("h"))   return "h";
        if (Input.GetKeyUp("i"))   return "i";
        if (Input.GetKeyUp("j"))   return "j";
        return null;
    }

    void showlist(IReadOnlyCollection<string> check_list){
        string log = "";
        foreach(string dir in check_list){
            log += dir.ToString() + ",";
        }
        Debug.Log(log);
    }

     void showlist(IReadOnlyCollection<int> check_list){
        string log = "";
        foreach(int dir in check_list){
            log += dir.ToString() + ",";
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