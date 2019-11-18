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
 
    /* debug request statement
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
    }*/

    void Update(){
        int send_msg;
        string[] receive_data;
        string get_key = return_get_keyborad();
        
        if(get_key != null){
            receive_data = get_key.Split(',');
            showlist(receive_data);
            if(receive_data[0] == "1"){
                if(motion_list.Contains(receive_data[1])){
                    send_msg = check_motionlist_to_memberlist(receive_data[1]);
                    ws.Send("1," + send_msg.ToString());
                }
            }else if(receive_data[0] == "2"){
                ws.Send(get_key);
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
        if (Input.GetKeyUp("0"))   return "1,0";
        if (Input.GetKeyUp("1"))   return "1,1";
        if (Input.GetKeyUp("2"))   return "1,2";
        if (Input.GetKeyUp("3"))   return "1,3";
        if (Input.GetKeyUp("4"))   return "1,4";
        if (Input.GetKeyUp("5"))   return "1,5";
        if (Input.GetKeyUp("6"))   return "1,6";
        if (Input.GetKeyUp("7"))   return "1,7";
        if (Input.GetKeyUp("8"))   return "1,8";
        if (Input.GetKeyUp("9"))   return "1,9";
        if (Input.GetKeyUp("a"))   return "2,1,0";
        if (Input.GetKeyUp("b"))   return "2,1,1";
        if (Input.GetKeyUp("c"))   return "2,1,2";
        if (Input.GetKeyUp("d"))   return "2,1,3";
        if (Input.GetKeyUp("e"))   return "2,1,4";
        if (Input.GetKeyUp("f"))   return "2,1,5";
        if (Input.GetKeyUp("g"))   return "2,2,0";
        if (Input.GetKeyUp("h"))   return "2,2,1";
        if (Input.GetKeyUp("i"))   return "2,2,2";
        if (Input.GetKeyUp("j"))   return "2,2,3";
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